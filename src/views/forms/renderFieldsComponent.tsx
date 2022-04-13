import Email from "./formBuilderFieldComponents/Email";
import MultiLine from "./formBuilderFieldComponents/MultiLine";
import SingleLine from "./formBuilderFieldComponents/SingleLine";
import Number from "./formBuilderFieldComponents/Number";
import Date from "./formBuilderFieldComponents/Date";
import Name from "./formBuilderFieldComponents/Name";
import MobileNumber from "./formBuilderFieldComponents/MobileNumber";
import Currency from "./formBuilderFieldComponents/Currency";
import FileUpload from "./formBuilderFieldComponents/FileUpload";
import ImageUpload from "./formBuilderFieldComponents/ImageUpload";
import Checkbox from "./formBuilderFieldComponents/Checkbox";
import Signature from "./formBuilderFieldComponents/Signature";
import Dropdown from "./formBuilderFieldComponents/Dropdown";

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

const renderFieldsComponent = (item, control, handleSubmit, watch) => {
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
  if (item.type === FormBuilderFieldTypes.NAME)
    return <Name item={item} control={control} handleSubmit={handleSubmit} />;
  if (item.type === FormBuilderFieldTypes.PHONE)
    return (
      <MobileNumber
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.CURRENCY)
    return (
      <Currency
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.FILE_UPLOAD)
    return (
      <FileUpload
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.CHECKBOX)
    return (
      <Checkbox
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.IMAGE_UPLOAD)
    return (
      <ImageUpload
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.FILE_UPLOAD)
    return (
      <FileUpload
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.SIGNATURE)
    return (
      <Signature
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  if (item.type === FormBuilderFieldTypes.DROPDOWN)
    return (
      <Dropdown
        item={item}
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
      />
    );
  return null;
};

export default renderFieldsComponent;
