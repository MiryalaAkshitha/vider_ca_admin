import { CategoryResponse } from "pages/settings/categories";
import { UseQueryResult } from "react-query";
import { DataResponse } from "types";

export type DataResponseType = UseQueryResult<CategoryResponse, Error>;
export type LabelsDataResponse = UseQueryResult<DataResponse, Error>;
export type ClientsDataResponse = UseQueryResult<DataResponse, Error>;
export type UsersDataResponse = UseQueryResult<DataResponse, Error>;

export interface StateProps {
  name: string;
  category: number | null;
  subCategory: number | null;
  client: number | null;
  recurring: boolean;
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  dueDate: string | null;
  recurringStartDate: string | null;
  recurringEndDate: string | null;
  dueDay: number | null;
  customDates: Array<{ startDate: string; endDate: string }>;
  labels: any[];
  members: any[];
  taskLeader: number | null;
  taskType: string | null;
}
