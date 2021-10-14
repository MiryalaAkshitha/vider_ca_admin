import { SystemStyleObject } from "@mui/system";
import { StyledTable } from "./styles";

interface TableProps {
  columns: Array<string>;
  children: any[];
  sx?: SystemStyleObject;
}

function Table({ columns, children, sx }: TableProps) {
  return (
    <StyledTable sx={sx}>
      <thead>
        {columns.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </thead>
      <tbody>{children}</tbody>
    </StyledTable>
  );
}

export default Table;
