import { UseQueryResult } from "react-query";
import { DataResponse } from "types";

export type DataResponseType = UseQueryResult<DataResponse, Error>;

export interface StateProps {
  name: string;
  category: number | null;
  subCategory: number | null;
  client: number[];
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  dueDate: string | null;
  labels: any[];
  members: any[];
  taskLeader: number | null;
}

export interface RecurringStateProps {
  name: string;
  category: number | null;
  subCategory: number | null;
  client: number[];
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  recurringStartDate: string | null;
  recurringEndDate: string | null;
  dueDay: number | null;
  customDates: Array<{ startDate: string; dueDate: string }>;
  labels: any[];
  members: any[];
  taskLeader: number | null;
}
