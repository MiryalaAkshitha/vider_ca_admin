import moment from "moment";

export const getTitle = (key: string) => {
  key = key || "";
  return key
    ?.split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
};

export const getFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} Bytes`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
  if (size < 1024 * 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
  return 0;
};

export const getHoursOptions = () => {
  return Array.from(Array(24).keys()).map((_, index) => {
    return {
      label: index <= 9 ? `0${index}` : index?.toString(),
      value: index <= 9 ? `0${index}` : index?.toString(),
    };
  });
};

export const getMinutesOptions = () => {
  return Array.from(Array(60).keys()).map((_, index) => {
    return {
      label: index <= 9 ? `0${index}` : index?.toString(),
      value: index <= 9 ? `0${index}` : index?.toString(),
    };
  });
};

export const formattedDate = (date: string) => {
  return moment(date).format("YYYY-MM-DD");
};

export const formattedDatetime = (date: string) => {
  return moment(date).format("YYYY-MM-DD HH:mm A");
};

export const getTotalLogHoursDuration = (logs: any[]) => {
  let total = logs.reduce((acc, cur) => {
    return acc + +cur.duration;
  }, 0);

  return moment.utc(total).format("HH:mm");
};

export const covertToKb = (size: number, type: "KB" | "MB" | "GB") => {
  if (type === "KB") {
    return size;
  }
  if (type === "MB") {
    return size * 1024;
  }
  return 0;
};

export const fileSizeInKb = (size: number) => {
  return size / 1024;
};

export const getFinancialYears = () => {
  return Array.from(Array(50).keys()).map((_, index) => {
    return `${2000 + index}-${2000 + index + 1}`;
  });
};
