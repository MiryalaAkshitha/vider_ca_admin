import { getTitle } from "utils";
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
        this.item.allowedDays?.map((item: string) => ({
          label: getTitle(item?.toLowerCase()),
          value: item,
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
}

export let getAddFieldDefaultValues = (item: any) => {
  return new GenerateAddFieldDefaultValues(item).getDefaultValues();
};
