import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
}

function RouterLink({ to, children }: Props) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "initial" }}>
      {children}
    </Link>
  );
}

export default RouterLink;
