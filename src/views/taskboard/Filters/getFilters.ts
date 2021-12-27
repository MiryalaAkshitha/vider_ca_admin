import { DateFilters, PriorityEnum, TaskStatus } from "utils/constants";

type Filter = {
  title: string;
  key: string;
  options: Array<{ label: string; value: string }>;
};

export const getFilters = ({ users, labels }): Filter[] => {
  return [
    {
      title: "Assignee",
      key: "assignee",
      options: users?.data?.map((item: any) => ({
        label: item?.firstName + " " + item?.lastName,
        value: item?.id.toString(),
      })),
    },
    {
      title: "Created by",
      key: "createdBy",
      options: users?.data?.map((item: any) => ({
        label: item?.firstName + " " + item?.lastName,
        value: item?.id?.toString(),
      })),
    },
    {
      title: "Completed by",
      key: "completedBy",
      options: users?.data?.map((item: any) => ({
        label: item?.firstName + " " + item?.lastName,
        value: item?.id?.toString(),
      })),
    },
    {
      title: "Status",
      key: "status",
      options: Object.values(TaskStatus).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Priority",
      key: "priority",
      options: Object.values(PriorityEnum).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Tags",
      key: "tags",
      options: labels?.data?.map((item: any) => ({
        label: item?.name,
        value: item?.id?.toString(),
      })),
    },
    {
      title: "Task Type",
      key: "taskType",
      options: [
        {
          label: "Recurring",
          value: "recurring",
        },
        {
          label: "Non-Recurring",
          value: "non_recurring",
        },
      ],
    },
    {
      title: "Start Date",
      key: "startDate",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Due on",
      key: "dueOn",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Created on",
      key: "createdOn",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Completed on",
      key: "completedOn",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
  ];
};
