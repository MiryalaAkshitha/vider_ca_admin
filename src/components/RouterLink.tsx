import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
  style?: any;
}

function RouterLink({ to, children, style }: Props) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "initial", ...style }}>
      {children}
    </Link>
  );
}

export default RouterLink;
