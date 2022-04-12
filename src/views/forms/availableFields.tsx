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
    title: "Single Line",
    type: FormBuilderFieldTypes.SINGLE_LINE,
    defaultValues: schemas.singleLineDefaultValues,
    schema: schemas.singleLineSchema,
  },
  {
    icon: icons.multiLine,
    title: "Multi Line",
    type: FormBuilderFieldTypes.MULTI_LINE,
    defaultValues: schemas.multiLineDefaultValues,
    schema: schemas.multiLineSchema,
  },
  {
    icon: icons.numbers,
    title: "Number",
    type: FormBuilderFieldTypes.NUMBER,
    defaultValues: schemas.numberDefaultValues,
    schema: schemas.numberSchema,
  },
  {
    icon: icons.mobileNumber,
    title: "Mobile Number",
    type: FormBuilderFieldTypes.PHONE,
    defaultValues: schemas.mobileNumberDefaultValues,
    schema: schemas.mobileNumberSchema,
  },
  {
    icon: icons.email,
    title: "Email",
    type: FormBuilderFieldTypes.EMAIL,
    defaultValues: schemas.emailDefaultValues,
    schema: schemas.emailSchema,
  },
  {
    icon: icons.name,
    title: "Name",
    type: FormBuilderFieldTypes.NAME,
    defaultValues: schemas.nameDefaultValues,
    schema: schemas.nameSchema,
  },
  {
    icon: icons.checkBox,
    title: "Check Box",
    type: FormBuilderFieldTypes.CHECKBOX,
    defaultValues: schemas.checkboxDefaultValues,
    schema: schemas.checkboxSchema,
  },
  {
    icon: icons.fileUpload,
    title: "File Upload",
    type: FormBuilderFieldTypes.FILE_UPLOAD,
    defaultValues: schemas.fileUploadDefaultValues,
    schema: schemas.fileUploadSchema,
  },
  {
    icon: icons.imageUpload,
    title: "Image Upload",
    type: FormBuilderFieldTypes.IMAGE_UPLOAD,
    defaultValues: schemas.imageUploadDefaultValues,
    schema: schemas.imageUploadSchema,
  },
  {
    icon: icons.termsAndConditions,
    title: "Terms & Conditions",
    type: FormBuilderFieldTypes.TERMS_AND_CONDITIONS,
    defaultValues: createNonRecurringTaskDefaultValues,
    schema: CreateNonRecurringClientSchema(() => {}),
  },
  {
    icon: icons.currency,
    title: "Currency",
    type: FormBuilderFieldTypes.CURRENCY,
    defaultValues: schemas.currencyDefaultValues,
    schema: schemas.currencySchema,
  },
  {
    icon: icons.signature,
    title: "Signature",
    type: FormBuilderFieldTypes.SIGNATURE,
    defaultValues: schemas.signatureDefaultValues,
    schema: schemas.signatureSchema,
  },
  {
    icon: icons.dropDown,
    title: "Drop Down",
    type: FormBuilderFieldTypes.DROPDOWN,
    defaultValues: createNonRecurringTaskDefaultValues,
    schema: CreateNonRecurringClientSchema(() => {}),
  },
  {
    icon: icons.decisionBox,
    title: "Decision Box",
    type: FormBuilderFieldTypes.DECISION_BOX,
    defaultValues: schemas.decisionBoxDefaultValues,
    schema: schemas.decisionBoxSchema,
  },
  {
    icon: icons.fieldDate,
    title: "Date",
    type: FormBuilderFieldTypes.DATE,
    defaultValues: schemas.dateDefaultValues,
    schema: schemas.dateSchema,
  },
];

export default availableFields;
