export const getFieldSize = (fieldSize: "SMALL" | "MEDIUM" | "LARGE") => {
  switch (fieldSize) {
    case "SMALL":
      return "50%";
    case "MEDIUM":
      return "75%";
    case "LARGE":
      return "100%";
    default:
      return "100%";
  }
};
