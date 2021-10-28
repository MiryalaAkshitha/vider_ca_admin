import { RouteComponentProps } from "react-router";

export interface IRoute {
  component: any;
  name: string;
  path: string;
  exact: boolean;
}

export interface LayoutProps extends RouteComponentProps<any> {
  routes: Array<IRoute>;
  title?: string;
}

export interface PageProps {
  routes?: Array<IRoute>;
  title?: string;
}

export interface DialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export interface DataResponse {
  data: any[];
}

export enum FILETYPES {
  JPEG = "image/jpeg",
  PNG = "image/png",
  SVG = "image/svg+xml",
  JPG = "image/jpg",
  TEXT = "text/plain",
  CSV = "text/csv",
  MP4 = "video/mp4",
  WEBM = "video/webm",
  PDF = "application/pdf",
  ZIP1 = "application/zip",
  ZIP2 = "application/vnd.android.package-archive",
  SHEET1 = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  SHEET2 = "application/vnd.oasis.opendocument.spreadsheet",
  SHEET3 = "application/vnd.ms-excel",
  DOC1 = "application/vnd.oasis.opendocument.text",
  DOC2 = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  DOC3 = "application/msword",
  PRESENTATION1 = "application/vnd.oasis.opendocument.presentation",
  PRESENTATION2 = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  PRESENTATION3 = "application/vnd.ms-powerpoint",
}
