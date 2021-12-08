import { Typography, TypographyProps } from "@mui/material";
import moment from "moment";

interface Props extends TypographyProps {
  date: string;
  format?: string;
}

function FormattedDate({ date, format = "MMM Do, YYYY", ...props }: Props) {
  return <Typography {...props}>{moment(date).format(format)}</Typography>;
}

export default FormattedDate;
