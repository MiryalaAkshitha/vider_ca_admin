import { icons } from "assets";
export const invoiceReportsList = [
    {
        title: "TasksCompeletedToBilledTasksReport",
        path: "/reports/TasksCompeletedToBilledTasksReport",
        desc: `Track receivables for completed tasks for which invoices have been raised.`,
        icon: icons.totalTasks,
    },
    {
        title: "TasksCompeletedToUnBilledTasksReport",
        path: "/reports/TasksCompeletedToUnBilledTasksReport",
        desc: `Track receivables, including pure agent services and fees, for completed tasks with invoices not yet raised.`,
        icon: icons.totalTasks,
    },
    {
        title: "ClientWiseTasksCompletedToBilledReport",
        path: "/reports/ClientWiseTasksCompletedToBilledReport",
        desc: `Admins identify amounts receivable and pending invoices for a specific client. `,
        icon: icons.totalTasks,
    },
    {
        title: "ClientWiseTasksCompletedToUnBilledReport",
        path: "/reports/ClientWiseTasksCompletedToUnBilledReport",
        desc: `Admins identify total amount receivable & tasks to be invoiced for a specific client. `,
        icon: icons.totalTasks,
    },
    {
        title: "InvoiceOverDueReport",
        path: "/reports/InvoiceOverDueReport",
        desc: `The report lists overdue invoices in order of their due date, with the oldest on top and the newest on bottom.`,
        icon: icons.totalTasks,
    },
    {
        title: "BalanceDueForInvoicesRaised",
        path: "/reports/BalanceDueForInvoicesRaisedReport",
        desc: `Balance amounts receivable with respect to each specific invoice are listed down.`,
        icon: icons.totalTasks,
    },
    {
        title: "ReceiptManagementReport",
        path: "/reports/ReceiptManagementReport",
        desc: `This report lists all receipts within a specified period, regardless of invoice dates, for easy total calculation. `,
        icon: icons.totalTasks,
    },
];