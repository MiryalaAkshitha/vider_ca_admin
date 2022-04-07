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
  maxCharacterLimit: "",
};

let emailSchema = object().shape({
  ...baseSchema,
  entryType: strReq("Entry Type"),
  maxCharacterLimit: strReq("Max Character Limit"),
});

let numberDefaultValues = {
  ...baseDefaultValues,
  entryType: "",
  unitSelection: "",
  unitTitle: "",
};

let numberSchema = {
  ...baseSchema,
  entryType: strReq("Entry Type"),
  unitSelection: strReq("Unit Selection"),
  unitTitle: strNotReq(),
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

export default {
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
};
