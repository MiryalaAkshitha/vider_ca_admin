import { FormBuilderFieldTypes } from "./renderFieldsComponent";

class GenerateAddFieldDefaultValues {
  defaultValues: any = {};
  item: any;

  constructor(item: any) {
    this.item = item;
  }

  getDefaultValues() {
    this.buildDefaultValues();
    return this.defaultValues;
  }

  buildDefaultValues() {
    switch (this.item.fieldType) {
      case FormBuilderFieldTypes.SINGLE_LINE:
        this.singleLineDefaultValues();
        break;

      case FormBuilderFieldTypes.DATE:
        this.dateDefaultValues();
        break;

      case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
        this.termsAndConditions();
        break;

      case FormBuilderFieldTypes.EMAIL:
        this.singleLineDefaultValues();
        break;

      case FormBuilderFieldTypes.CHECKBOX:
        this.checkboxDefaultValues();
        break;

      case FormBuilderFieldTypes.RADIO:
        this.radioDefaultValues();
        break;

      case FormBuilderFieldTypes.DROPDOWN:
        this.dropdownDefaultValues();
        break;

      case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
        this.dropdownMultipleDefaultValues();
        break;

      case FormBuilderFieldTypes.DECISION_BOX:
        this.decisionBoxDefaultValues();
        break;

      case FormBuilderFieldTypes.NUMBER:
        this.numberDefaultValues();
        break;

      case FormBuilderFieldTypes.MULTI_LINE:
        this.multilineDefaultValues();
        break;

      case FormBuilderFieldTypes.FILE_UPLOAD:
        this.fileUploadDefaultValues();
        break;

      case FormBuilderFieldTypes.CURRENCY:
        this.currencyDefaultValues();
        break;

      case FormBuilderFieldTypes.PHONE:
        this.phoneDefaultValues();
        break;

      case FormBuilderFieldTypes.NAME:
        this.nameDefaultValues();
        break;

      case FormBuilderFieldTypes.ADDRESS:
        this.addressDefaultValues();
        break;

      default:
        break;
    }
  }

  singleLineDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      placeHolder: this.item.placeHolder || "",
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      validationFormat: this.item.validationFormat || "",
      range: this.item.range || {
        min: 0,
        max: 255,
        type: "VALUES",
      },
      instructions: this.item.instructions || "",
    };
  }

  dateDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      allowedDays:
        this.item.allowedDays?.map((item: any) => ({
          label: item?.label,
          value: item?.value,
        })) || [],
      allowedDates: this.item.allowedDates || "",
      startDate: this.item?.dateRange?.startDate || null,
      endDate: this.item?.dateRange?.endDate || null,
    };
  }

  termsAndConditions() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      termsAndConditions: this.item.termsAndConditions || "",
    };
  }

  checkboxDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      range: this.item.range || {
        min: 0,
        max: 10,
        type: "CHOICES",
      },
      options: this.item.options || [],
    };
  }

  radioDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      options: this.item.options || [],
    };
  }

  dropdownDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      options: this.item.options || [],
    };
  }

  dropdownMultipleDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      options: this.item.options || [],
      range: this.item.range || {
        min: 0,
        max: 0,
        type: "VALUES",
      },
    };
  }

  decisionBoxDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      defaultValue: this.item.defaultValue || false,
      checkedText: this.item.decisionText?.checkedText || "",
      uncheckedText: this.item.decisionText?.uncheckedText || "",
    };
  }

  numberDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      placeHolder: this.item.placeHolder || "",
      instructions: this.item.instructions || "",
      range: this.item.range || {
        min: 1,
        max: 1,
        type: "VALUES",
      },
    };
  }

  multilineDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      placeHolder: this.item.placeHolder || "",
      instructions: this.item.instructions || "",
      showCharacterCount: this.item.showCharacterCount || false,
      range: this.item.range || {
        min: 1,
        max: 1,
        type: "CHARACTERS",
      },
    };
  }

  fileUploadDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      uploadFileTypes: this.item.uploadFileTypes || [],
      fileMaxSize: this.item?.fileMaxSize?.size || 1,
      fileMaxSizeType: this.item?.fileMaxSize?.type || "KB",
      range: this.item.range || {
        min: 1,
        max: 1,
        type: "FILES",
      },
    };
  }

  currencyDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      placeHolder: this.item.placeHolder || "",
      currencyType: this.item.currencyType || "",
      currencyDisplay: this.item.currencyDisplay || "",
      range: this.item.range || {
        min: 1,
        max: 1,
        type: "VALUES",
      },
    };
  }

  phoneDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      required: this.item.required,
      fieldSize: this.item.fieldSize,
      placeHolder: this.item.placeHolder || "",
      includeCountryCode: this.item.includeCountryCode || false,
      allowedCountries: this.item.allowedCountries || [],
      defaultCountryCode: this.item.defaultCountryCode || "91",
      range: this.item.range || {
        min: 1,
        max: 1,
        type: "VALUES",
      },
    };
  }

  nameDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      fieldSize: this.item.fieldSize,
      fieldType: this.item.fieldType,
      instructions: this.item.instructions || "",
      inputs: this.item.inputs,
      titleOptions:
        this.item.inputs.find((item: any) => item.inputType === "TITLE")
          ?.options || [],
    };
  }

  addressDefaultValues() {
    this.defaultValues = {
      label: this.item.label,
      fieldSize: this.item.fieldSize,
      fieldType: this.item.fieldType,
      instructions: this.item.instructions || "",
      inputs: this.item.inputs,
    };
  }
}

export let getAddFieldDefaultValues = (item: any) => {
  return new GenerateAddFieldDefaultValues(item).getDefaultValues();
};
