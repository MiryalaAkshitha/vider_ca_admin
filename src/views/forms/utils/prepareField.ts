import { FormBuilderFieldTypes } from "./renderFieldsComponent";

export function prepareField(item: any) {
  let field = {
    label: item?.label,
    required: false,
    fieldType: item?.fieldType,
  };

  let options = [1, 2, 3].map((item) => {
    return {
      label: `Option ${item}`,
      value: `Option ${item}`,
    };
  });

  switch (item?.fieldType) {
    case FormBuilderFieldTypes.SINGLE_LINE:
      return {
        ...field,
        range: {
          min: 1,
          max: 1,
          type: "CHARACTERS",
        },
      };

    case FormBuilderFieldTypes.MULTI_LINE:
      return {
        ...field,
        range: {
          min: 1,
          max: 1,
          type: "CHARACTERS",
        },
        showCharacterCount: false,
      };

    case FormBuilderFieldTypes.EMAIL:
      return {
        ...field,
        range: {
          min: 1,
          max: 1,
          type: "CHARACTERS",
        },
      };

    case FormBuilderFieldTypes.DROPDOWN:
      return {
        ...field,
        options,
      };

    case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
      return {
        ...field,
        options,
        range: {
          min: 1,
          max: 1,
          type: "VALUES",
        },
      };

    case FormBuilderFieldTypes.RADIO:
      return {
        ...field,
        displayColumns: "1_COLUMN",
        options,
      };

    case FormBuilderFieldTypes.CHECKBOX:
      return {
        ...field,
        displayColumns: "1_COLUMN",
        range: {
          min: 1,
          max: 1,
          type: "CHOICES",
        },
        options,
      };

    case FormBuilderFieldTypes.DATE:
      return {
        ...field,
        allowedDates: "ALL",
        allowedDays: [],
      };

    case FormBuilderFieldTypes.PHONE:
      return {
        ...field,
        includeCountryCode: false,
        defaultCountryCode: "91",
        allowedCountries: [],
        range: {
          min: 1,
          max: 20,
          type: "VALUES",
        },
      };

    case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
      return {
        ...field,
        termsAndConditions: "terms and conditions",
      };

    case FormBuilderFieldTypes.CURRENCY:
      return {
        ...field,
        currencyType: "USD",
        currencyDisplay: "CODE",
        range: {
          min: 1,
          max: 1,
          type: "VALUES",
        },
      };

    case FormBuilderFieldTypes.FILE_UPLOAD:
      return {
        ...field,
        uploadFileTypes: [],
        range: {
          min: 1,
          max: 1,
          type: "FILES",
        },
        fileMaxSize: {
          size: 150,
          type: "KB",
        },
      };

    case FormBuilderFieldTypes.NAME:
      return {
        ...field,
        inputs: nameInputs,
      };

    case FormBuilderFieldTypes.ADDRESS:
      return {
        ...field,
        inputs: addressInputs,
      };

    case FormBuilderFieldTypes.DECISION_BOX:
      return {
        ...field,
        defaultValue: false,
        checkedText: "",
        uncheckedText: "",
      };

    case FormBuilderFieldTypes.NUMBER:
      return {
        ...field,
        range: {
          min: 1,
          max: 1,
          type: "VALUES",
        },
      };

    case FormBuilderFieldTypes.SIGNATURE:
      return {
        ...field,
        signatureType: 1,
        signatureDocument: [
          {
            name: "sample.pdf",
            type: "application/pdf",
            size: 1234,
            url: "https://www.google.com/samples/test.pdf",
          },
        ],
        coSign: false,
        preview: false,
        signaturePosition: "Bottom-Right",
        selectPage: "ALL",
      };

    case FormBuilderFieldTypes.SECTION:
      return {
        ...field,
        description: "",
      };

    default:
      return field;
  }
}

let nameInputs = [
  {
    label: "Title",
    inputType: "TITLE",
    required: false,
    hide: false,
    options: [
      {
        label: "Mr.",
        value: "Mr.",
      },
      {
        label: "Mrs.",
        value: "Mrs.",
      },
      {
        label: "Ms.",
        value: "Ms.",
      },
    ],
  },
  {
    label: "First Name",
    inputType: "FIRST_NAME",
    required: false,
    hide: false,
  },
  {
    label: "Last Name",
    inputType: "LAST_NAME",
    required: false,
    hide: false,
  },
  {
    label: "Middle Name",
    inputType: "MIDDLE_NAME",
    required: false,
    hide: false,
  },
];

let addressInputs = [
  {
    label: "Street",
    inputType: "ADDRESS_LINE1",
    required: false,
    hide: false,
  },
  {
    label: "Area",
    inputType: "ADDRESS_LINE2",
    required: false,
    hide: false,
  },
  {
    label: "City",
    inputType: "CITY",
    required: false,
    hide: false,
  },
  {
    label: "State",
    inputType: "STATE",
    required: false,
    hide: false,
  },
  {
    label: "Pincode",
    inputType: "PINCODE",
    required: false,
    hide: false,
  },
  {
    label: "Country",
    inputType: "COUNTRY",
    required: false,
    hide: false,
  },
];
