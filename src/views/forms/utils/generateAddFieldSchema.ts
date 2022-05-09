import { array, boolean, date, number, object, string } from "yup";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

interface RangeProps {
  minMin?: number;
  minMax?: number;
  maxMin?: number;
  maxMax?: number;
}

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

      case FormBuilderFieldTypes.NUMBER:
        this.numberSchema();
        break;

      case FormBuilderFieldTypes.MULTI_LINE:
        this.multilineSchema();
        break;

      case FormBuilderFieldTypes.FILE_UPLOAD:
        this.fileUploadSchema();
        break;

      case FormBuilderFieldTypes.CURRENCY:
        this.currencySchema();
        break;

      case FormBuilderFieldTypes.PHONE:
        this.phoneSchema();
        break;

      case FormBuilderFieldTypes.NAME:
        this.nameSchema();
        break;

      case FormBuilderFieldTypes.SIGNATURE:
        this.signatureSchema();
        break;

      case FormBuilderFieldTypes.SECTION:
        this.sectionSchema();
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

  rangeSchema(rangeProps?: RangeProps) {
    rangeProps = rangeProps || {
      minMin: 1,
      minMax: 100,
      maxMin: 1,
      maxMax: 255,
    };
    const { minMin = 1, maxMin = 1 } = rangeProps;
    return object().shape({
      min: number().required().min(minMin, `Minimum value is ${minMin}`),
      max: number().required().min(maxMin, `Minimum value is ${maxMin}`),
      type: string().required(),
    });
  }

  singleLineSchema() {
    this.schema = {
      ...this.baseSchema(),
      placeHolder: string().notRequired(),
      instructions: string().notRequired(),
      range: this.rangeSchema(),
      validation: string().notRequired(),
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
      ...this.baseSchema(),
      options: array().required().min(1, "Add at least one option"),
    };
  }

  dropdownMultipleValues() {
    this.schema = {
      ...this.baseSchema(),
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

  numberSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      fieldSize: string().required(),
      placeHolder: string().notRequired(),
      instructions: string().notRequired(),
      range: this.rangeSchema(),
    };
  }

  multilineSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      fieldSize: string().required(),
      placeHolder: string().notRequired(),
      instructions: string().notRequired(),
      showCharacterCount: boolean().required(),
      range: this.rangeSchema(),
    };
  }

  fileUploadSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      range: this.rangeSchema(),
      fileMaxSize: number()
        .required()
        .typeError("Size must be a number")
        .min(1, "Minimum size is 1"),
      fileMaxSizeType: string().required(),
    };
  }

  currencySchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      range: this.rangeSchema(),
      fieldSize: string().required(),
      placeHolder: string().notRequired(),
      currencyType: string().required(),
      currencyDisplay: string().required(),
    };
  }

  phoneSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      required: boolean().required(),
      placeHolder: string().notRequired(),
      fieldSize: string().required(),
      range: this.rangeSchema(),
      includeCountryCode: boolean().required(),
      allowedCountries: array().required(),
      defaultCountryCode: string().required(),
    };
  }

  nameSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      instructions: string().notRequired(),
      fieldSize: string().required(),
      inputs: array(
        object().shape({
          label: string().required("Field name is required"),
          inputType: string().required(),
          inputSize: string().required(),
          required: boolean().required(),
          hide: boolean().required(),
        })
      )
        .required()
        .min(1, "Add at least one input"),
      titleOptions: array().min(1, "Add at least one option"),
    };
  }

  addressSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      instructions: string().notRequired(),
      fieldSize: string().required(),
      inputs: array(
        object().shape({
          label: string().required("Field name is required"),
          inputType: string().required(),
          inputSize: string().required(),
          required: boolean().required(),
          hide: boolean().required(),
        })
      )
        .required()
        .min(1, "Add at least one input"),
    };
  }

  signatureSchema() {
    this.schema = {
      label: string().required("Field name is required"),
      instructions: string().notRequired(),
      signatureDocument: array().required().min(1, "Document is required"),
      preview: boolean().required(),
      signatureSelectionMode: string().required(),
      pageLevelCoordinates: string().when("signatureSelectionMode", {
        is: "MANUAL",
        then: (schema) => {
          return schema.required("Page level coordinates are required");
        },
        otherwise: (schema) => schema.notRequired(),
      }),
      selectPage: string().required(),
      pageNumbers: string().when("pages", {
        is: "SPECIFY",
        then: (schema) =>
          schema
            .required("Page numbers are required")
            .matches(/^[0-9,]+$/, "Page numbers must be comma separated"),
        otherwise: (schema) => schema.notRequired(),
      }),
      signaturePosition: string().required(),
      coSign: boolean().required(),
      noOfSignatures: string().when("coSign", {
        is: true,
        then: (schema) => schema.required("Number of signatures is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      signatureDetails: array(
        object().shape({
          name: string().required("Name is required"),
          designation: string().required("Designation is required"),
        })
      ),
    };
  }

  sectionSchema() {
    this.schema = {
      label: string().required("Section name is required"),
      description: string().notRequired(),
    };
  }
}

export let getAddFieldSchema = (item: any) => {
  return new GenerateAddFieldSchema(item).getSchema();
};
