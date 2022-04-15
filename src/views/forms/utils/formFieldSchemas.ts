import { array, boolean, mixed, object, string } from "yup";

const strReq = (val) => string().required(`${val} required`);
const strNotReq = () => string().notRequired();

let baseDefaultValues = {
  fieldName: "",
  fieldInstructions: "",
  fieldSize: "",
  placeHolderText: "",
  fieldType: "",
};

let baseSchema = {
  fieldName: strReq("Field Name"),
  fieldInstructions: strReq("Field Instructions"),
  fieldSize: strReq("Field Size"),
  placeHolderText: strReq("PlaceHolderText"),
  fieldType: strReq("Field Type"),
};

let singleLineDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  min: "",
  max: "",
  validationType: "",
  validationTypeInput: "",
};

let singleLineSchema = object().shape({
  ...baseSchema,
  entryType: strReq("Entry Type"),
  min: strNotReq(),
  max: strNotReq(),
  validationType: strReq("Validation Type is required"),
  validationTypeInput: mixed().when("validationType", {
    is: (validationType) => validationType === "Yes",
    then: strReq("Validation Type Input"),
  }),
});

let multiLineDefaultValues = {
  ...baseSchema,
  entryType: "",
  min: strNotReq(),
  max: strNotReq(),
  showCharacterLimit: boolean(),
};

let multiLineSchema = object().shape({
  ...baseSchema,
  entryType: strReq("Entry Type"),
  showCharacterLimit: boolean().required("Show Character Limit required"),
});

let emailDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  min: "",
  max: "",
};

let emailSchema = object().shape({
  ...baseSchema,
  entryType: strReq("Entry Type"),
  min: strReq("Min Character Limit"),
  max: strReq("Max Character Limit"),
});

let numberDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  unitSelection: "",
  unitTitle: "",
  unitTitleAddOn: "",
};

let numberSchema = {
  ...baseSchema,
  entryType: strReq("Entry Type"),
  unitSelection: strReq("Unit Selection"),
  unitTitle: strNotReq(),
  unitTitleAddon: strNotReq(),
};

let dateDefaultValues = {
  ...baseDefaultValues,
  dateFormat: "",
  allowedDays: [],
  allowedDates: "",
  from: "",
  to: "",
};

let dateSchema = object().shape({
  ...baseSchema,
  dateFormat: strReq("Date Format"),
  allowedDays: array()
    .of(
      object().nullable().shape({
        label: string().notRequired(),
        value: string().notRequired(),
      })
    )
    .notRequired(),
  allowedDates: strNotReq(),
  from: strNotReq(),
  to: strNotReq(),
});

let nameDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  nameComponents: [],
  titleElements: [],
};

let nameSchema = {
  ...baseSchema,
  entryType: strNotReq(),
  nameComponents: array().of(object().nullable().shape({})),
  titleElements: array().of(
    object().nullable().shape({
      label: strNotReq(),
      value: strNotReq(),
    })
  ),
};

let mobileNumberDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  min: "",
  max: "",
  showCountryCodes: boolean,
  selectCountries: [],
};

let mobileNumberSchema = object().shape({
  ...baseSchema,
  entryType: strNotReq(),
  min: strNotReq(),
  max: strNotReq(),
  showCountryCodes: boolean().notRequired(),
  selectCountries: mixed().when("showCountryCodes", {
    is: (showCountryCodes) => showCountryCodes,
    then: array()
      .of(
        object().nullable().shape({
          label: string().required(),
          value: string().required(),
        })
      )
      .min(1, "Select atleast one country"),
    otherwise: object().nullable().notRequired(),
  }),
});

let currencyDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  currency: "",
  thousandSeparator: "",
};

let currencySchema = object().shape({
  ...baseSchema,
  entryType: strReq("Entry Type"),
  currency: strReq("Currency"),
  thousandSeparator: strReq("Thousand Separator"),
});

let fileUploadDefaultValues = {
  ...baseDefaultValues,
  uploadType: "",
  uploadLimit: "",
  sizeType: "",
  maxFileSize: "",
};

let fileUploadSchema = object().shape({
  ...baseSchema,
  uploadType: strReq("Upload Type"),
  uploadLimit: strReq("Upload Limit"),
  sizeType: strReq("Size Type"),
  maxFileSize: strReq("Maximum File Size"),
});

let checkboxDefaultValues = {
  fieldName: "",
  fieldInstructions: "",
  fieldSize: "",
  fieldType: "",
  options: [],
  selectType: "",
  display: "",
};

let checkboxSchema = object().shape({
  fieldName: strNotReq(),
  fieldInstructions: strNotReq(),
  fieldSize: strNotReq(),
  fieldType: strNotReq(),
  options: array().of(
    object().nullable().shape({
      label: string().required(),
      value: string().required(),
    })
  ),
  selectType: strNotReq(),
  display: strNotReq(),
});

let imageUploadDefaultValues = {
  ...baseDefaultValues,
  uploadLimit: "",
  sizeType: "",
  maxFileSize: "",
};

let imageUploadSchema = object().shape({
  fieldName: strNotReq(),
  fieldInstructions: strNotReq(),
  fieldSize: strNotReq(),
  fieldType: strNotReq(),
  uploadLimit: strReq("Upload Limit"),
  sizeType: strReq("Size Type"),
  maxFileSize: strReq("Maximum File Size"),
});

let signatureDefaultValues = {
  fieldName: "",
};

let signatureSchema = object().shape({
  fieldName: strReq("Signature"),
});

let dropDownDefaultValues = {
  ...baseDefaultValues,
  dropDownComponents: [],
  selectionType: "",
  min: "",
  max: "",
};

let dropDownSchema = object().shape({
  ...baseSchema,
  dropDownComponents: array().of(
    object().nullable().shape({
      label: string().required(),
      value: string().required(),
    })
  ),
  selectionType: strReq("Selection Type"),
  min: mixed().when("selectionType", {
    is: (selectionType) => selectionType === "multiple",
    then: strReq("Min"),
  }),
  max: mixed().when("selectionType", {
    is: (selectionType) => selectionType === "multiple",
    then: strReq("Max "),
  }),
});

let addressDefaultValues = {
  ...baseDefaultValues,
  addressComponents: [],
};

let addressSchema = object().shape({
  ...baseSchema,
  addressComponents: array().of(
    object().nullable().shape({
      label: strNotReq(),
      value: strNotReq(),
      isVisible: boolean().notRequired(),
      isMandatory: boolean().notRequired(),
    })
  ),
});

let termsAndConditionsDefaultValues = {
  termsAndConditions: "",
  declaration: "",
  fieldType: "",
};

let termsAndConditionsSchema = object().shape({
  termsAndConditions: strReq("Terms and Conditions"),
  declaration: string().nullable().notRequired(),
  fieldType: string().nullable().notRequired(),
});

let decisionBoxDefaultValues = {
  fieldName: "",
  fieldInstructions: "",
  intialStatus: "",
  whenChecked: "",
  whenUnchecked: "",
};

let decisionBoxSchema = object().shape({
  feildName: strNotReq(),
  fieldInstructions: strNotReq(),
  intialStatus: strNotReq(),
  whenChecked: strNotReq(),
  whenUnchecked: strNotReq(),
});

let radioBoxDefaultValues = {
  ...baseDefaultValues,
  radioComponents: [],
};

let radioBoxSchema = object().shape({
  ...baseSchema,
  dropDownComponents: array().of(
    object().nullable().shape({
      label: string().required(),
      value: string().required(),
    })
  ),
});

const schemas = {
  singleLineDefaultValues,
  singleLineSchema,
  multiLineDefaultValues,
  multiLineSchema,
  emailDefaultValues,
  emailSchema,
  numberDefaultValues,
  numberSchema,
  dateDefaultValues,
  dateSchema,
  nameDefaultValues,
  nameSchema,
  mobileNumberDefaultValues,
  mobileNumberSchema,
  currencyDefaultValues,
  currencySchema,
  fileUploadDefaultValues,
  fileUploadSchema,
  checkboxDefaultValues,
  checkboxSchema,
  imageUploadDefaultValues,
  imageUploadSchema,
  signatureDefaultValues,
  signatureSchema,
  dropDownDefaultValues,
  dropDownSchema,
  radioBoxDefaultValues,
  radioBoxSchema,
  decisionBoxDefaultValues,
  decisionBoxSchema,
  addressDefaultValues,
  addressSchema,
  termsAndConditionsDefaultValues,
  termsAndConditionsSchema,
};

export default schemas;
