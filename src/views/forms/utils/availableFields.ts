import { icons } from "assets";
import {
  CreateNonRecurringClientSchema,
  createNonRecurringTaskDefaultValues,
} from "validations/createTask";
import schemas from "./formFieldSchemas";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

const availableFields = [
  {
    icon: icons.singleLine,
    label: "Single Line",
    fieldType: FormBuilderFieldTypes.SINGLE_LINE,
    defaultValues: schemas.singleLineDefaultValues,
    schema: schemas.singleLineSchema,
  },
  {
    icon: icons.multiLine,
    label: "Multi Line",
    fieldType: FormBuilderFieldTypes.MULTI_LINE,
    defaultValues: schemas.multiLineDefaultValues,
    schema: schemas.multiLineSchema,
  },
  {
    icon: icons.numbers,
    label: "Number",
    fieldType: FormBuilderFieldTypes.NUMBER,
    defaultValues: schemas.numberDefaultValues,
    schema: schemas.numberSchema,
  },
  {
    icon: icons.name,
    label: "Name",
    fieldType: FormBuilderFieldTypes.NAME,
    defaultValues: schemas.nameDefaultValues,
    schema: schemas.nameSchema,
  },
  {
    icon: icons.address,
    label: "Address",
    fieldType: FormBuilderFieldTypes.ADDRESS,
    defaultValues: schemas.addressDefaultValues,
    schema: schemas.addressSchema,
  },
  {
    icon: icons.mobileNumber,
    label: "Mobile Number",
    fieldType: FormBuilderFieldTypes.PHONE,
    defaultValues: schemas.mobileNumberDefaultValues,
    schema: schemas.mobileNumberSchema,
  },
  {
    icon: icons.email,
    label: "Email",
    fieldType: FormBuilderFieldTypes.EMAIL,
    defaultValues: schemas.emailDefaultValues,
    schema: schemas.emailSchema,
  },
  {
    icon: icons.fieldDate,
    label: "Date",
    fieldType: FormBuilderFieldTypes.DATE,
    defaultValues: schemas.dateDefaultValues,
    schema: schemas.dateSchema,
  },
  {
    icon: icons.decisionBox,
    label: "Decision Box",
    fieldType: FormBuilderFieldTypes.DECISION_BOX,
    defaultValues: schemas.decisionBoxDefaultValues,
    schema: schemas.decisionBoxSchema,
  },
  {
    icon: icons.dropDown,
    label: "Drop Down",
    fieldType: FormBuilderFieldTypes.DROPDOWN,
    defaultValues: createNonRecurringTaskDefaultValues,
    schema: CreateNonRecurringClientSchema(() => {}),
  },
  {
    icon: icons.checkBox,
    label: "Check Box",
    fieldType: FormBuilderFieldTypes.CHECKBOX,
    defaultValues: schemas.checkboxDefaultValues,
    schema: schemas.checkboxSchema,
  },
  {
    icon: icons.checkBox,
    label: "Radio",
    fieldType: FormBuilderFieldTypes.RADIO,
    defaultValues: schemas.radioBoxDefaultValues,
    schema: schemas.radioBoxSchema,
  },
  {
    icon: icons.currency,
    label: "Currency",
    fieldType: FormBuilderFieldTypes.CURRENCY,
    defaultValues: schemas.currencyDefaultValues,
    schema: schemas.currencySchema,
  },
  {
    icon: icons.fileUpload,
    label: "File Upload",
    fieldType: FormBuilderFieldTypes.FILE_UPLOAD,
    defaultValues: schemas.fileUploadDefaultValues,
    schema: schemas.fileUploadSchema,
  },
  {
    icon: icons.imageUpload,
    label: "Image Upload",
    fieldType: FormBuilderFieldTypes.IMAGE_UPLOAD,
    defaultValues: schemas.imageUploadDefaultValues,
    schema: schemas.imageUploadSchema,
  },
  {
    icon: icons.termsAndConditions,
    label: "Terms & Conditions",
    fieldType: FormBuilderFieldTypes.TERMS_AND_CONDITIONS,
    defaultValues: schemas.termsAndConditionsDefaultValues,
    schema: schemas.termsAndConditionsSchema,
  },
];

export default availableFields;
