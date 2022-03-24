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
