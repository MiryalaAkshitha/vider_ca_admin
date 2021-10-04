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
