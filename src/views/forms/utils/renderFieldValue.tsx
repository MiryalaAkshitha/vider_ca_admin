import moment from "moment";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

export const renderFieldValue = (field: any) => {
  let fieldType = field?.fieldType;

  if (
    fieldType === FormBuilderFieldTypes.DROPDOWN_MULTIPLE ||
    fieldType === FormBuilderFieldTypes.CHECKBOX
  ) {
    return field?.value?.map((item: any) => item?.label)?.join(", ") || "--";
  }

  if (fieldType === FormBuilderFieldTypes.PHONE) {
    return field?.value
      ? `+${field?.value?.code} ${field?.value?.number}`
      : "--";
  }

  if (fieldType === FormBuilderFieldTypes.DROPDOWN) {
    return field?.value?.label || "--";
  }

  if (fieldType === FormBuilderFieldTypes.DATE) {
    return field?.value
      ? moment(field?.value).format("YYYY-MM-DD HH:mm A")
      : "--";
  }

  if (
    fieldType === FormBuilderFieldTypes.DECISION_BOX ||
    fieldType === FormBuilderFieldTypes.TERMS_AND_CONDITIONS
  ) {
    return field?.value ? "YES" : "NO";
  }

  return field?.value || "--";
};
