import { DateFilters, PriorityEnum, TaskStatus } from "utils/constants";

type Filter = {
  title: string;
  options: Array<{ label: string; value: string }>;
};

export const getFilters = ({ users, labels }): Filter[] => {
  return [
    {
      title: "Assignee",
      options: users?.data?.map((item: any) => ({
        label: item?.firstName + " " + item?.lastName,
        value: item?.id,
      })),
    },
    {
      title: "Created by",
      options: users?.data?.map((item: any) => ({
        label: item?.firstName + " " + item?.lastName,
        value: item?.id,
      })),
    },
    {
      title: "Completed by",
      options: users?.data?.map((item: any) => ({
        label: item?.firstName + " " + item?.lastName,
        value: item?.id,
      })),
    },
    {
      title: "Status",
      options: Object.values(TaskStatus).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Priority",
      options: Object.values(PriorityEnum).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Tags",
      options: labels?.data?.map((item: any) => ({
        label: item?.name,
        value: item?.name,
      })),
    },
    {
      title: "Task Type",
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
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Due on",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Created on",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
    {
      title: "Completed on",
      options: Object.values(DateFilters).map((item) => ({
        label: item,
        value: item,
      })),
    },
  ];
};
