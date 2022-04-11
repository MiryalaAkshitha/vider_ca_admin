import Email from "./formBuilderFieldComponents/Email";
import MultiLine from "./formBuilderFieldComponents/MultiLine";
import SingleLine from "./formBuilderFieldComponents/SingleLine";
import Number from "./formBuilderFieldComponents/Number";
import Date from "./formBuilderFieldComponents/Date";

export enum FormBuilderFieldTypes {
  NAME = "NAME",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  NUMBER = "NUMBER",
  DATE = "DATE",
  TIME = "TIME",
  DATE_TIME = "DATE_TIME",
  DECISION_BOX = "DECISION_BOX",
  CHECKBOX = "CHECKBOX",
  RADIO = "RADIO",
  DROPDOWN = "DROPDOWN",
  DROPDOWN_MULTIPLE = "DROPDOWN_MULTIPLE",
  SINGLE_LINE = "SINGLE_LINE",
  MULTI_LINE = "MULTI_LINE",
  ADDRESS = "ADDRESS",
  WEBSITE = "WEBSITE",
  CURRENCY = "CURRENCY",
  IMAGE_UPLOAD = "IMAGE_UPLOAD",
  FILE_UPLOAD = "FILE_UPLOAD",
  SIGNATURE = "SIGNATURE",
  TERMS_AND_CONDITIONS = "TERMS_AND_CONDITIONS",
}

const renderFieldsComponent = (item, control, handleSubmit) => {
  if (item.type === FormBuilderFieldTypes.SINGLE_LINE)
    return (
      <SingleLine item={item} control={control} handleSubmit={handleSubmit} />
    );
  if (item.type === FormBuilderFieldTypes.MULTI_LINE)
    return (
      <MultiLine item={item} control={control} handleSubmit={handleSubmit} />
    );
  if (item.type === FormBuilderFieldTypes.EMAIL)
    return <Email item={item} control={control} handleSubmit={handleSubmit} />;
  if (item.type === FormBuilderFieldTypes.NUMBER)
    return <Number item={item} control={control} handleSubmit={handleSubmit} />;
  if (item.type === FormBuilderFieldTypes.DATE)
    return <Date item={item} control={control} handleSubmit={handleSubmit} />;
  return null;
};

export default renderFieldsComponent;
