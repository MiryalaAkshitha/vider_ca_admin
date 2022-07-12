import moment from "moment";

export const formattedDate = (date: string) => {
  return moment(date).format("YYYY-MM-DD");
};
