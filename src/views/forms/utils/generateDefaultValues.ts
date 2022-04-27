import { FormBuilderFieldTypes } from "./renderFieldsComponent";

export function generateDefaultValues(data: any) {
  let result = {};
  for (let field of data) {
    const type = field?.fieldType;
    let hasInputs =
      type === FormBuilderFieldTypes.NAME ||
      type === FormBuilderFieldTypes.ADDRESS;

    if (hasInputs) {
      result[field._id] = {};

      field?.inputs?.forEach((input: any) => {
        result[field._id] = {
          ...result[field._id],
          [input?._id]: input.value || "",
        };
      });

      continue;
    }

    if (type === FormBuilderFieldTypes.DECISION_BOX) {
      result[field._id] = field.value || false;
    }

    if (type === FormBuilderFieldTypes.SINGLE_LINE) {
      result[field._id] = field.value || "";
    }

    if (type === FormBuilderFieldTypes.MULTI_LINE) {
      result[field._id] = field.value || "";
    }

    if (type === FormBuilderFieldTypes.NUMBER) {
      result[field._id] = field.value || 0;
    }

    if (type === FormBuilderFieldTypes.DATE) {
      result[field._id] = field.value || null;
    }

    if (type === FormBuilderFieldTypes.PHONE) {
      result[field._id] = field.value || "";
    }

    if (type === FormBuilderFieldTypes.EMAIL) {
      result[field._id] = field.value || "";
    }

    if (type === FormBuilderFieldTypes.DROPDOWN) {
      result[field._id] = field.value || "";
    }

    if (type === FormBuilderFieldTypes.CHECKBOX) {
      result[field._id] = field.value || [];
    }

    if (type === FormBuilderFieldTypes.RADIO) {
      result[field._id] = field.value || "";
    }

    if (type === FormBuilderFieldTypes.DROPDOWN_MULTIPLE) {
      result[field._id] = field.value || [];
    }

    if (type === FormBuilderFieldTypes.CURRENCY) {
      result[field._id] = field.value || 0;
    }

    if (type === FormBuilderFieldTypes.TERMS_AND_CONDITIONS) {
      result[field._id] = field.value || false;
    }
  }

  return result;
}
