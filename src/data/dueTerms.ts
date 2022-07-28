export enum DueTerms {
  DUE_ON_RECEIPT = "DUE_ON_RECEIPT",
  NET_15 = "NET_15",
  NET_30 = "NET_30",
  NET_45 = "NET_45",
  NET_60 = "NET_60",
  DUE_ON_END_OF_MONTH = "DUE_ON_END_OF_MONTH",
  DUE_ON_END_OF_NEXT_MONTH = "DUE_ON_END_OF_THE_NEXT_MONTH",
  CUSTOM_DUE_DATE = "CUSTOM_DUE_DATE",
}

export const DUE_TERMS = [
  {
    label: "Due on Receipt",
    value: DueTerms.DUE_ON_RECEIPT,
  },
  {
    label: "Net 15",
    value: DueTerms.NET_15,
  },
  {
    label: "Net 30",
    value: DueTerms.NET_30,
  },
  {
    label: "Net 45",
    value: DueTerms.NET_45,
  },
  {
    label: "Net 60",
    value: DueTerms.NET_60,
  },
  {
    label: "Due on end of the month",
    value: DueTerms.DUE_ON_END_OF_MONTH,
  },
  {
    label: "Due on end of the next month",
    value: DueTerms.DUE_ON_END_OF_NEXT_MONTH,
  },
  {
    label: "Custom Due Date",
    value: DueTerms.CUSTOM_DUE_DATE,
  },
];
