export interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const invoicingMenu: Array<IMenuItem> = [
  {
    title: "Clients",
    path: "/billing/clients",
  },
  {
    title: "Estimates",
    path: "/billing/estimates",
  },
  {
    title: "Invoices",
    path: "/billing/invoices",
  },
  {
    title: "Receipts",
    path: "/billing/receipts",
  },
];
