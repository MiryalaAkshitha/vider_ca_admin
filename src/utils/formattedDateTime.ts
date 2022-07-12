import moment from "moment";

export const formattedDatetime = (date: string) => {
  return moment(date).format("YYYY-MM-DD HH:mm A");
};
