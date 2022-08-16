import { Dispatch, SetStateAction } from "react";
import { UseQueryResult } from "react-query";

export type StorageResponse = UseQueryResult<
  {
    data: {
      result: any[];
      breadCrumbs: [];
    };
  },
  Error
>;

export type ResType = UseQueryResult<any, any>;

export type InputChangeType = React.ChangeEvent<HTMLInputElement>;

export type SubmitType = React.FormEvent<HTMLFormElement>;

export type ViewType = "grid" | "list";

export interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DataResponse {
  data: any[];
}
