export const getStatusColor = (status: string) => {
  switch (status) {
    case "DRAFT":
      return "#FF9F72";
    case "EMAIL_SENT":
      return "#00AFC2";
    case "APPROVED":
      return "#00AFC2";
    case "APPROVAL_PENDING":
      return "#EC595C";
    case "CANCELLED":
      return "#EC595C";
    case "INVOICED":
      return "#5AB77F";
    default:
      return "#f5f5f5";
  }
};
