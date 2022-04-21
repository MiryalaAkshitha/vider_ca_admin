import moment from "moment";
import { array, boolean, date, number, object, string } from "yup";
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

        case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
          this.dropdownMultipleSchema(item);
          break;

        case FormBuilderFieldTypes.DATE:
          this.dateSchema(item);
          break;

        case FormBuilderFieldTypes.PHONE:
          this.phoneSchema(item);
          break;

        case FormBuilderFieldTypes.FILE_UPLOAD:
          this.fileUploadSchema(item);
          break;

        case FormBuilderFieldTypes.IMAGE_UPLOAD:
          this.fileUploadSchema(item);
          break;

        case FormBuilderFieldTypes.CURRENCY:
          this.currencySchema(item);
          break;

        case FormBuilderFieldTypes.NAME:
          this.nameSchema(item);
          break;

        case FormBuilderFieldTypes.ADDRESS:
          this.nameSchema(item);
          break;

        case FormBuilderFieldTypes.NUMBER:
          this.numberSchema(item);
          break;

        case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
          this.termsAndConditionsSchema(item);
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

  dropdownMultipleSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;
    let validation = array(
      object().shape({
        label: string().required(),
        value: string().required(),
      })
    ).nullable();

    if (item.required) {
      validation = validation.required(`${item.label} is required`);

      if (item?.range) {
        validation = validation.min(min, `${label} must be at least ${min}`);
        validation = validation.max(max, `${label} must be at most ${max}`);
      }
    }

    this.schema[attribute] = validation;
  }

  dateSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.dateRange?.startDate;
    let max = item?.dateRange?.endDate;
    let validation = date().nullable().typeError("Date is not valid");

    if (item.required) {
      validation = validation.required(`${item.label} is required`);

      if (item?.allowedDates === "CUSTOM") {
        validation = validation.min(
          min,
          `${label} must be ${moment(min).format("YYYY-MM-DD")} or after`
        );
        validation = validation.max(
          max,
          `${label} must be before ${moment(max).format("YYYY-MM-DD")}`
        );
      }

      if (item?.allowedDates === "FUTURE") {
        validation = validation.min(
          moment().format("YYYY-MM-DD"),
          `${label} must be today or after today`
        );
      }

      if (item?.allowedDates === "PAST") {
        validation = validation.max(
          moment().format("YYYY-MM-DD"),
          `${label} must be before today`
        );
      }

      if (item?.allowedDays && item?.allowedDays?.length > 0) {
        validation = validation.test(
          attribute,
          `${label} must be one of ${item?.allowedDays
            ?.map((item: any) => item?.label)
            ?.join(", ")}`,
          (value) => {
            return item?.allowedDays
              ?.map((item: any) => item?.value)
              ?.includes(moment(value).format("dddd"));
          }
        );
      }
    }

    this.schema[attribute] = validation;
  }

  phoneSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;

    let validation = object().shape({
      code: (() => {
        let result: any;
        if (item?.includeCountryCode) {
          result = string()
            .required(`${item.label} is required`)
            .default(item?.defaultCountryCode);
        } else {
          result = string().notRequired().default("");
        }
        return result;
      })(),
      number: (() => {
        let result = string().default("");

        if (item?.required) {
          result = result.required(`${item.label} is required`);
        }

        result = result.matches(/^[0-9]*$/, `${item.label} must be a number`);

        if (item?.range) {
          result = result.min(min, `${label} must be at least ${min}`);
          result = result.max(max, `${label} must be at most ${max}`);
        }

        return result;
      })(),
    });

    this.schema[attribute] = validation;
  }

  fileUploadSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;
    let validation = array(string()).nullable();

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }

    if (item?.range) {
      validation = validation.min(min, `${label} must be at least ${min}`);
      validation = validation.max(max, `${label} must be at most ${max}`);
    }

    this.schema[attribute] = validation;
  }

  currencySchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;
    let validation = number().typeError("Currency must be a number");

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }

    if (item?.range) {
      validation = validation.min(min, `${label} must be at least ${min}`);
      validation = validation.max(max, `${label} must be at most ${max}`);
    }

    this.schema[attribute] = validation;
  }

  nameSchema(item: any) {
    let attribute = item._id?.toString();
    let validation: any = {};

    item.inputs.forEach((input: any) => {
      if (input.hide) return;

      let inputValidation = string().default("");

      if (input.required) {
        inputValidation = inputValidation.required(
          `${input.label} is required`
        );
      }
      validation[input._id?.toString()] = inputValidation;
    });

    let finalValidation = object().shape(validation);

    if (item.required) {
      finalValidation = finalValidation?.required(`${item.label} is required`);
    }

    this.schema[attribute] = finalValidation;
  }

  numberSchema(item: any) {
    let attribute = item._id?.toString();
    let label = item.label;
    let min = item?.range?.min;
    let max = item?.range?.max;
    let validation = number();

    if (item.required) {
      validation = validation.required(`${item.label} is required`);
    }

    if (item?.range) {
      if (item?.range?.type === "VALUES") {
        validation = validation.min(min, `${label} must be at least ${min}`);
        validation = validation.max(max, `${label} must be at most ${max}`);
      }
      if (item?.range?.type === "DIGITS") {
        validation = validation.test(
          attribute,
          `${label} must be minimum ${min} digits`,
          (value: any) => {
            return value?.toString().length >= min;
          }
        );

        validation = validation.test(
          attribute,
          `${label} must not exceed ${max} digits`,
          (value: any) => {
            return value?.toString().length <= max;
          }
        );
      }
    }

    this.schema[attribute] = validation;
  }

  termsAndConditionsSchema(item: any) {
    let validation = boolean().required().default(false);

    if (item.required) {
      validation = validation.isTrue(`This is required`);
    }

    this.schema[item._id?.toString()] = validation;
  }
}

export let dynamicSchema = (fields: any[]) => {
  return new GenerateSchema(fields).getSchema();
};
