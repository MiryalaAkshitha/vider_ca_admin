export enum TAX_TYPE {
  NON_TAXABLE = "NON_TAXABLE",
  OUT_OF_SCOPE = "OUT_OF_SCOPE",
  NON_GST_SUPPLY = "NON_GST_SUPPLY",
  GST0 = "GST0",
  GST5 = "GST5",
  GST12 = "GST12",
  GST18 = "GST18",
  GST28 = "GST28",
}

export const TAXES = [
  {
    name: "Non Taxable",
    value: TAX_TYPE.NON_TAXABLE,
    desc: "",
  },
  {
    name: "Out of scope",
    value: TAX_TYPE.OUT_OF_SCOPE,
    desc: "Supplies on which you don’t charge any GST or include them in the returns",
  },
  {
    name: "Non - GST Supply",
    value: TAX_TYPE.NON_GST_SUPPLY,
    desc: "Supplies which do not come under GST such as petroleum products and Liquor",
  },
  {
    name: "GST0 (0%)",
    value: TAX_TYPE.GST0,
    desc: "",
  },
  {
    name: "GST5 (5%)",
    value: TAX_TYPE.GST5,
    desc: "",
  },
  {
    name: "GST12 (12%)",
    value: TAX_TYPE.GST12,
    desc: "",
  },
  {
    name: "GST18 (18%)",
    value: TAX_TYPE.GST18,
    desc: "",
  },
  {
    name: "GST28 (28%)",
    value: TAX_TYPE.GST28,
    desc: "",
  },
];
