import Address from "../formBuilderFieldComponents/Address";
import Checkbox from "../formBuilderFieldComponents/Checkbox";
import Currency from "../formBuilderFieldComponents/Currency";
import Date from "../formBuilderFieldComponents/Date";
import DecisionBox from "../formBuilderFieldComponents/DecisonBox";
import Dropdown from "../formBuilderFieldComponents/Dropdown";
import DropDownMultiple from "../formBuilderFieldComponents/DropdownMultiple";
import Email from "../formBuilderFieldComponents/Email";
import FileUpload from "../formBuilderFieldComponents/FileUpload";
import ImageUpload from "../formBuilderFieldComponents/ImageUpload";
import MobileNumber from "../formBuilderFieldComponents/MobileNumber";
import MultiLine from "../formBuilderFieldComponents/MultiLine";
import Name from "../formBuilderFieldComponents/Name";
import Number from "../formBuilderFieldComponents/Number";
import RadioBox from "../formBuilderFieldComponents/RadioBox";
import SingleLine from "../formBuilderFieldComponents/SingleLine";
import TermsAndConditions from "../formBuilderFieldComponents/TermsAndConditions";

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
  TERMS_AND_CONDITIONS = "TERMS_AND_CONDITIONS",
}

export enum FormBuilderInputTypes {
  ADDRESS_LINE1 = "ADDRESS_LINE1",
  ADDRESS_LINE2 = "ADDRESS_LINE2",
  CITY = "CITY",
  STATE = "STATE",
  ZIP = "ZIP",
  COUNTRY = "COUNTRY",
  TITLE = "TITLE",
  FIRST_NAME = "FIRST_NAME",
  LAST_NAME = "LAST_NAME",
  MIDDLE_NAME = "MIDDLE_NAME",
}

export const renderFieldsComponent = (item: any, control: any, watch: any) => {
  switch (item.fieldType) {
    case FormBuilderFieldTypes.SINGLE_LINE:
      return <SingleLine item={item} control={control} />;

    case FormBuilderFieldTypes.MULTI_LINE:
      return <MultiLine item={item} control={control} />;

    case FormBuilderFieldTypes.EMAIL:
      return <Email item={item} control={control} />;

    case FormBuilderFieldTypes.NUMBER:
      return <Number item={item} control={control} />;

    case FormBuilderFieldTypes.DATE:
      return <Date item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.NAME:
      return <Name item={item} control={control} />;

    case FormBuilderFieldTypes.PHONE:
      return <MobileNumber item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.CURRENCY:
      return <Currency item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.CHECKBOX:
      return <Checkbox item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.IMAGE_UPLOAD:
      return <ImageUpload item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.FILE_UPLOAD:
      return <FileUpload item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.DROPDOWN:
      return <Dropdown item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
      return <DropDownMultiple item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.ADDRESS:
      return <Address item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
      return <TermsAndConditions item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.DECISION_BOX:
      return <DecisionBox item={item} control={control} watch={watch} />;

    case FormBuilderFieldTypes.RADIO:
      return <RadioBox item={item} control={control} watch={watch} />;

    default:
      return null;
  }
};
