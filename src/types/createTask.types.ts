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
  labels: any[];
  client: number | null;
  recurring: boolean;
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  startDate: string | null;
  dueDate: string | null;
  startDay: number | null;
  dueDay: number | null;
  endDate: string | null;
  members: any[];
  taskLeader: number | null;
  taskType: string | null;
}
