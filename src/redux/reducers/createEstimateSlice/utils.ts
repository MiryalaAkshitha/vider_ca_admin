import { DueTerms } from "data/dueTerms";
import moment from "moment";

export function getEstimatedDueDate(value: string | null, date: any) {
  switch (value) {
    case DueTerms.DUE_ON_RECEIPT:
      return date;
    case DueTerms.NET_15:
      return moment(date).add(15, "days").format("YYYY-MM-DD");
    case DueTerms.NET_30:
      return moment(date).add(30, "days").format("YYYY-MM-DD");
    case DueTerms.NET_45:
      return moment(date).add(45, "days").format("YYYY-MM-DD");
    case DueTerms.NET_60:
      return moment(date).add(60, "days").format("YYYY-MM-DD");
    case DueTerms.DUE_ON_END_OF_MONTH:
      return moment(date).endOf("month").format("YYYY-MM-DD");
    case DueTerms.DUE_ON_END_OF_NEXT_MONTH:
      return moment(date).add(1, "month").endOf("month").format("YYYY-MM-DD");
    case DueTerms.CUSTOM_DUE_DATE:
      return null;
    default:
      return null;
  }
}
