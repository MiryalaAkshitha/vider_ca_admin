import isEqual from "lodash/isEqual";
import Quill from "quill";
import React from "react";
import ReactDOM from "react-dom";

class ReactQuill extends React.Component {
  static displayName = "React Quill";
  static Quill = Quill;
  dirtyProps = ["modules", "formats", "bounds", "theme", "children"];
  cleanProps = [
    "id",
    "className",
    "style",
    "placeholder",
    "tabIndex",
    "onChange",
    "onChangeSelection",
    "onFocus",
    "onBlur",
    "onKeyPress",
    "onKeyDown",
    "onKeyUp",
  ];

  static defaultProps = {
    theme: "snow",
    modules: {},
    readOnly: false,
    preserveWhitespace: false,
  };

  state = {
    generation: 0,
  };

  editor;
  editingArea;
  value;
  selection;
  lastDeltaChangeSet;
  regenerationSnapshot;
  unprivilegedEditor;

  constructor(props) {
    super(props);
    const value = this.isControlled() ? props.value : props.defaultValue;
    this.value = value ?? "";
  }

  validateProps(props) {
    if (React.Children.count(props.children) > 1)
      throw new Error(
        "The Quill editing area can only be composed of a single React element."
      );

    if (React.Children.count(props.children)) {
      const child = React.Children.only(props.children);
      if (child?.type === "textarea")
        throw new Error(
          "Quill does not support editing on a <textarea>. Use a <div> instead."
        );
    }

    if (this.lastDeltaChangeSet && props.value === this.lastDeltaChangeSet)
      throw new Error(
        "You are passing the `delta` object from the `onChange` event back " +
          "as `value`. You most probably want `editor.getContents()` instead. " +
          "See: https://github.com/zenoamaro/react-quill#using-deltas"
      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.validateProps(nextProps);
    if (!this.editor || this.state.generation !== nextState.generation) {
      return true;
    }

    if ("value" in nextProps) {
      const prevContents = this.getEditorContents();
      const nextContents = nextProps.value ?? "";
      if (!this.isEqualValue(nextContents, prevContents)) {
        this.setEditorContents(this.editor, nextContents);
      }
    }

    if (nextProps.readOnly !== this.props.readOnly) {
      this.setEditorReadOnly(this.editor, nextProps.readOnly);
    }

    return [...this.cleanProps, ...this.dirtyProps].some((prop) => {
      return !isEqual(nextProps[prop], this.props[prop]);
    });
  }

  shouldComponentRegenerate(nextProps) {
    return this.dirtyProps.some((prop) => {
      return !isEqual(nextProps[prop], this.props[prop]);
    });
  }

  componentDidMount() {
    this.instantiateEditor();
    this.setEditorContents(this.editor, this.getEditorContents());
  }

  componentWillUnmount() {
    this.destroyEditor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.editor && this.shouldComponentRegenerate(prevProps)) {
      const delta = this.editor.getContents();
      const selection = this.editor.getSelection();
      this.regenerationSnapshot = { delta, selection };
      this.setState({ generation: this.state.generation + 1 });
      this.destroyEditor();
    }

    if (this.state.generation !== prevState.generation) {
      const { delta, selection } = this.regenerationSnapshot;
      delete this.regenerationSnapshot;
      this.instantiateEditor();
      const editor = this.editor;
      editor.setContents(delta);
      postpone(() => this.setEditorSelection(editor, selection));
    }
  }

  instantiateEditor() {
    if (this.editor) return;
    this.editor = this.createEditor(
      this.getEditingArea(),
      this.getEditorConfig()
    );
  }

  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
    delete this.editor;
  }

  isControlled() {
    return "value" in this.props;
  }

  getEditorConfig() {
    return {
      bounds: this.props.bounds,
      formats: this.props.formats,
      modules: this.props.modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      scrollingContainer: this.props.scrollingContainer,
      tabIndex: this.props.tabIndex,
      theme: this.props.theme,
    };
  }

  getEditor() {
    if (!this.editor) throw new Error("Accessing non-instantiated editor");
    return this.editor;
  }

  createEditor(element, config) {
    const editor = new Quill(element, config);
    if (config.tabIndex != null) {
      this.setEditorTabIndex(editor, config.tabIndex);
    }
    this.hookEditor(editor);
    return editor;
  }

  hookEditor(editor) {
    this.unprivilegedEditor = this.makeUnprivilegedEditor(editor);
    editor.on("editor-change", this.onEditorChange);
  }

  unhookEditor(editor) {
    editor.off("editor-change", this.onEditorChange);
  }

  getEditorContents() {
    return this.value;
  }

  getEditorSelection() {
    return this.selection;
  }

  isDelta(value) {
    return value && value.ops;
  }

  isEqualValue(value, nextValue) {
    if (this.isDelta(value) && this.isDelta(nextValue)) {
      return isEqual(value.ops, nextValue.ops);
    } else {
      return isEqual(value, nextValue);
    }
  }

  setEditorContents(editor, value) {
    this.value = value;
    const sel = this.getEditorSelection();
    if (typeof value === "string") {
      editor.setContents(editor.clipboard.convert(value));
    } else {
      editor.setContents(value);
    }
    postpone(() => this.setEditorSelection(editor, sel));
  }

  setEditorSelection(editor, range) {
    this.selection = range;
    if (range) {
      const length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(
        0,
        Math.min(range.length, length - 1 - range.index)
      );
      editor.setSelection(range);
    }
  }

  setEditorTabIndex(editor, tabIndex) {
    if (editor?.scroll?.domNode) {
      editor.scroll.domNode.tabIndex = tabIndex;
    }
  }

  setEditorReadOnly(editor, value) {
    if (value) {
      editor.disable();
    } else {
      editor.enable();
    }
  }

  makeUnprivilegedEditor(editor) {
    const e = editor;
    return {
      getHTML: () => e.root.innerHTML,
      getLength: e.getLength.bind(e),
      getText: e.getText.bind(e),
      getContents: e.getContents.bind(e),
      getSelection: e.getSelection.bind(e),
      getBounds: e.getBounds.bind(e),
    };
  }

  getEditingArea() {
    if (!this.editingArea) {
      throw new Error("Instantiating on missing editing area");
    }
    const element = ReactDOM.findDOMNode(this.editingArea);
    if (!element) {
      throw new Error("Cannot find element for editing area");
    }
    if (element.nodeType === 3) {
      throw new Error("Editing area cannot be a text node");
    }
    return element;
  }

  renderEditingArea() {
    const { children, preserveWhitespace } = this.props;
    const { generation } = this.state;

    const properties = {
      key: generation,
      ref: (instance) => {
        this.editingArea = instance;
      },
    };

    if (React.Children.count(children)) {
      return React.cloneElement(React.Children.only(children), properties);
    }

    return preserveWhitespace ? (
      <pre {...properties} />
    ) : (
      <div {...properties} />
    );
  }

  render() {
    return (
      <div
        id={this.props.id}
        style={this.props.style}
        key={this.state.generation}
        className={`quill ${this.props.className ?? ""}`}
        onKeyPress={this.props.onKeyPress}
        onKeyDown={this.props.onKeyDown}
        onKeyUp={this.props.onKeyUp}
      >
        {this.renderEditingArea()}
      </div>
    );
  }

  onEditorChange = (eventName, rangeOrDelta, oldRangeOrDelta, source) => {
    if (eventName === "text-change") {
      this.onEditorChangeText?.(
        this.editor.root.innerHTML,
        rangeOrDelta,
        source,
        this.unprivilegedEditor
      );
    } else if (eventName === "selection-change") {
      this.onEditorChangeSelection?.(
        rangeOrDelta,
        source,
        this.unprivilegedEditor
      );
    }
  };

  onEditorChangeText(value, delta, source, editor) {
    if (!this.editor) return;
    const nextContents = this.isDelta(this.value)
      ? editor.getContents()
      : editor.getHTML();

    if (nextContents !== this.getEditorContents()) {
      this.lastDeltaChangeSet = delta;
      this.value = nextContents;
      this.props.onChange?.(value, delta, source, editor);
    }
  }

  onEditorChangeSelection(nextSelection, source, editor) {
    if (!this.editor) return;
    const currentSelection = this.getEditorSelection();
    const hasGainedFocus = !currentSelection && nextSelection;
    const hasLostFocus = currentSelection && !nextSelection;

    if (isEqual(nextSelection, currentSelection)) return;

    this.selection = nextSelection;
    this.props.onChangeSelection?.(nextSelection, source, editor);

    if (hasGainedFocus) {
      this.props.onFocus?.(nextSelection, source, editor);
    } else if (hasLostFocus) {
      this.props.onBlur?.(currentSelection, source, editor);
    }
  }

  focus() {
    if (!this.editor) return;
    this.editor.focus();
  }

  blur() {
    if (!this.editor) return;
    this.selection = null;
    this.editor.blur();
  }
}

function postpone(fn) {
  Promise.resolve().then(fn);
}

export default ReactQuill;
