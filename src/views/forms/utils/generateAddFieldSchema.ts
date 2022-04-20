import { array, boolean, date, number, object, string } from "yup";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

class GenerateAddFieldSchema {
  schema: any = {};
  item: any;

  constructor(item: any) {
    this.item = item;
  }

  getSchema() {
    this.buildSchema();
    return object().shape(this.schema);
  }

  buildSchema() {
    switch (this.item.fieldType) {
      case FormBuilderFieldTypes.SINGLE_LINE:
        this.singleLineSchema();
        break;

      case FormBuilderFieldTypes.EMAIL:
        this.emailShema();
        break;

      case FormBuilderFieldTypes.DATE:
        this.dateSchema();
        break;

      case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
        this.termsAndConditionsSchema();
        break;

      case FormBuilderFieldTypes.CHECKBOX:
        this.checkboxSchema();
        break;

      case FormBuilderFieldTypes.RADIO:
        this.radioSchema();
        break;

      case FormBuilderFieldTypes.DROPDOWN:
        this.dropdownValues();
        break;

      case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
        this.dropdownMultipleValues();
        break;

      case FormBuilderFieldTypes.DECISION_BOX:
        this.decisionBoxSchema();
        break;

      default:
        break;
    }
  }

  baseSchema() {
    return {
      label: string().required("Field name is required"),
      required: boolean().required(),
      fieldSize: string().required(),
    };
  }

  rangeSchema() {
    return object().shape({
      min: number().required().min(1, "Minimum value is 1"),
      max: number()
        .required()
        .min(1, "Minimum value is 1")
        .max(255, "Maximum value is 255"),
      type: string().required(),
    });
  }

  singleLineSchema() {
    this.schema = {
      ...this.baseSchema(),
      placeHolder: string().notRequired(),
      validationFormat: string().notRequired(),
      instructions: string().notRequired(),
      range: this.rangeSchema(),
    };
  }

  emailShema() {
    this.schema = {
      ...this.baseSchema(),
      placeHolder: string().notRequired(),
      range: this.rangeSchema(),
    };
  }

  dateSchema() {
    this.schema = {
      ...this.baseSchema(),
      allowedDates: string().notRequired(),
      allowedDays: array().notRequired(),
      startDate: date()
        .nullable()
        .typeError("Date is not valid")
        .when("allowedDates", {
          is: "CUSTOM",
          then: (schema) => schema.required("Start date is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      endDate: date()
        .nullable()
        .typeError("Date is not valid")
        .when("allowedDates", {
          is: "CUSTOM",
          then: (schema) => schema.required("End date is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
    };
  }

  termsAndConditionsSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      termsAndConditions: string().required(),
    };
  }

  checkboxSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      options: array().required().min(1, "Add at least one option"),
      range: this.rangeSchema(),
    };
  }

  radioSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      options: array().required().min(1, "Add at least one option"),
    };
  }

  dropdownValues() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      options: array().required().min(1, "Add at least one option"),
    };
  }

  dropdownMultipleValues() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      options: array().required().min(1, "Add at least one option"),
      range: this.rangeSchema(),
    };
  }

  decisionBoxSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      defaultValue: boolean().required(),
      checkedText: string().notRequired(),
      uncheckedText: string().notRequired(),
    };
  }
}

export let getAddFieldSchema = (item: any) => {
  return new GenerateAddFieldSchema(item).getSchema();
};
