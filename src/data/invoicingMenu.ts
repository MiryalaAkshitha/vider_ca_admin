import { icons } from "assets";

export interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const invoicingMenu: Array<IMenuItem> = [
  {
    title: "Estimates",
    path: "/invoicing/estimates",
    icon: icons.dashboard,
  },
  // {
  //   title: "Dashboard",
  //   path: "/invoicing/dashboard",
  //   icon: icons.dashboard,
  // },
  // {
  //   title: "Clients",
  //   path: "/invoicing/clients",
  //   icon: icons.dashboard,
  // },
  // {
  //   title: "Billing",
  //   path: "",
  //   icon: icons.dashboard,
  //   children: [
  //     {
  //       title: "Invoices",
  //       path: "/invoicing/billing/invoices",
  //       icon: icons.dashboard,
  //     },
  //     {
  //       title: "Estimates",
  //       path: "/invoicing/estimates",
  //       icon: icons.dashboard,
  //     },
  //     {
  //       title: "Receipts",
  //       path: "/invoicing/billing/receipts",
  //       icon: icons.dashboard,
  //     },
  //     {
  //       title: "Recurring Invoices",
  //       path: "/invoicing/billing/recurring-invoices",
  //       icon: icons.dashboard,
  //     },
  //   ],
  // },
];
