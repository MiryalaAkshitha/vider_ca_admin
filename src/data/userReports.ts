import { icons } from "assets";
export const userReportsList = [
    {
        title: "Status-Wise-Tasks",
        path: "/reports/status-wise-tasks",
        desc: `Track down total tasks as per their status of each employee`,
        icon: icons.totalTasks,
    },
    // hide this report as of now 
    // {
    //     title: "Service Category Status by Tasks",
    //     path: "/reports/service-category-status-wise-tasks",
    //     desc: `Track total no. of tasks under each category of each employee.
    //   `,
    //     icon: icons.totalTasks,
    // },
    {
        title: "User-Based Master Report",
        path: "/reports/user-based-master-report",
        desc: `Track down the detailed list of tasks rendered by a specific user`,
        icon: icons.totalTasks,
    },
    {
        title: "Overdue Tasks",
        path: "/reports/over-due-tasks-report",
        desc: `track total overdues tasks of each employee`,
        icon: icons.totalTasks,
    },
    {
        title: "Detailed Overdue Tasks",
        path: "/reports/detailed-over-due-tasks-report",
        desc: `Track detailed overdue tasks of a specific employee.`,
        icon: icons.totalTasks,
    },
    {
        title: "Highest No. of Tasks Completion",
        path: "/reports/highest-task-completion-reports",
        desc: `know who is the efficient employee of your organisation?
        `,
        icon: icons.totalTasks,
    },
];