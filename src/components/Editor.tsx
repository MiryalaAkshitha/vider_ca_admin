import Quill from "quill";
import { useEffect, memo, useRef } from "react";

interface EditorProps {
  onChange: (v: string) => void;
  id: string;
}

function Editor(props: EditorProps) {
  let quill = useRef<Quill>();

  useEffect(() => {
    if (!props.id) return;
    quill.current = new Quill(`#${props.id}`, { theme: "snow" });
  }, []);

  quill.current?.on("editor-change", (e: any) => {
    console.log(quill.current?.root.innerHTML, "dfdfdfsd");
  });

  return <div id={props.id}></div>;
}

function compareFunction(prevProps: any, nextProps: any) {
  if (prevProps?.id === nextProps?.id) return true;
  return false;
}

export default memo(Editor, compareFunction);
