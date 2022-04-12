import { array, boolean, object, string } from "yup";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

class GenerateSchema {
  schema = {};
  fields: any[] = [];

  constructor(fields: any[]) {
    this.fields = fields;
  }

  getSchema() {
    this.buildSchema();
    return object().shape(this.schema);
  }

  buildSchema() {
    this.fields?.forEach((item: any) => {
      switch (item.fieldType) {
        case FormBuilderFieldTypes.SINGLE_LINE:
          this.singleLineSchema(item);
          break;

        case FormBuilderFieldTypes.MULTI_LINE:
          this.multilineSchema(item);
          break;

        case FormBuilderFieldTypes.EMAIL:
          this.emailSchema(item);
          break;

        case FormBuilderFieldTypes.DECISION_BOX:
          this.decisionBoxSchema(item);
          break;

        case FormBuilderFieldTypes.DROPDOWN:
          this.dropdownSchema(item);
          break;

        case FormBuilderFieldTypes.RADIO:
          this.radioSchema(item);
          break;

        case FormBuilderFieldTypes.CHECKBOX:
          this.checkboxSchema(item);
          break;

        default:
          break;
      }
    });
  }

  singleLineSchema(item: any) {
    let validation = string();
    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }
    if (item?.range) {
      validation = validation.min(
        item.range.min,
        `${item.label} must be at least ${item.range.min} characters`
      );
      validation = validation.max(
        item.range.max,
        `${item.label} must be at most ${item.range.max} characters`
      );
    }
    this.schema[item._id?.toString()] = validation;
  }

  multilineSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;
    let validation = string();

    if (item.required) {
      validation = validation.required(`${label} is required`);
    }

    if (item?.range && item?.range?.type === "CHARACTERS") {
      validation = validation.min(
        min,
        `${label} must be at least ${min} characters`
      );
      validation = validation.max(
        max,
        `${label} must be at most ${max} characters`
      );
    }

    if (item?.range && item?.range?.type === "WORDS") {
      validation = validation.test(
        attribute,
        `${label} must be at least ${min} words`,
        (value) => {
          value = value || "";
          const words = value.split(" ");
          return words.length >= min;
        }
      );
      validation = validation.test(
        attribute,
        `${label} must be at most ${max} words`,
        (value) => {
          value = value || "";
          const words = value.split(" ");
          return words.length <= max;
        }
      );
    }
    this.schema[attribute] = validation;
  }

  emailSchema(item: any) {
    let validation = string().email(`${item.label} is not valid`);

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }
    this.schema[item._id?.toString()] = validation;
  }

  decisionBoxSchema(item: any) {
    let validation = boolean().required().default(false);
    this.schema[item._id?.toString()] = validation;
  }

  dropdownSchema(item: any) {
    let validation = string();

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }

    this.schema[item._id?.toString()] = validation;
  }

  radioSchema(item: any) {
    let validation = string();

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }

    this.schema[item._id?.toString()] = validation;
  }

  checkboxSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;
    let validation = array().nullable();

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }

    if (item?.range) {
      validation = validation.min(min, `${label} must be at least ${min}`);
      validation = validation.max(max, `${label} must be at most ${max}`);
    }

    this.schema[attribute] = validation;
  }
}

export let dynamicSchema = (fields: any[]) => {
  return new GenerateSchema(fields).getSchema();
};
