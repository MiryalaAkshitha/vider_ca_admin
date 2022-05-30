import { Avatar, Box, Typography } from "@mui/material";
import { icons } from "assets";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectChats } from "redux/reducers/chatsSlice";

function Message({ data }) {
  const userId = localStorage.getItem("userId") || "";
  const { type, members } = useSelector(selectChats);

  let user = members?.find((member: any) => member.id === data?.senderId);

  let outGoing = +data?.senderId === +userId;

  let isImage = data?.fileType?.includes("image");
  let isPdf = data?.fileType?.includes("pdf");
  let isDoc =
    data?.fileType?.includes("document") ||
    data?.fileType?.includes("msword") ||
    data?.fileType?.includes("text");
  let isExcel =
    data?.fileType?.includes("sheet") ||
    data?.fileType?.includes("spreadsheet") ||
    data?.fileType?.includes("ms-excel");

  let isZip =
    data?.fileType?.includes("zip") ||
    data?.fileType?.includes("rar") ||
    data?.fileType?.includes("archive");

  const getIcon = () => {
    if (isPdf) return icons.pdf;
    if (isDoc) return icons.doc;
    if (isExcel) return icons.excel;
    if (isZip) return icons.zip;
    return icons.doc;
  };

  return (
    <Box
      display="flex"
      justifyContent={outGoing ? "flex-end" : "flex-start"}
      gap={1}
      mb={2}
    >
      <Avatar
        src={user?.imageUrl || ""}
        sx={{ width: 30, height: 30, order: outGoing ? 2 : 1 }}
      />
      <Box
        sx={{
          background: outGoing ? "#D9FFEB" : "#F5F5F5",
          p: 1,
          borderRadius: 2,
          [`borderTop${outGoing ? "Right" : "Left"}Radius`]: 0,
          maxWidth: "70%",
          order: outGoing ? 1 : 2,
          mt: 1,
          minWidth: 100,
        }}
      >
        {type === "GROUP" && (
          <Typography
            color="primary"
            variant="caption"
            sx={{ display: "block", fontSize: 10, mb: "2px" }}
          >
            {outGoing ? "You" : user?.fullName}
          </Typography>
        )}
        {data?.message && (
          <Typography
            color="rgba(0,0,0,0.8)"
            variant="body2"
            sx={{ display: "block" }}
          >
            {data?.message}
          </Typography>
        )}
        {data?.file && isImage && (
          <a href={data?.file} target="_blank" rel="noopener noreferrer">
            <img
              src={data?.file}
              alt="file"
              style={{ maxWidth: "100%", maxHeight: 500 }}
            />
          </a>
        )}
        {data?.file && !isImage && (
          <a
            href={data?.file}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box display="flex" gap={1} alignItems="center">
              <img src={getIcon()} alt="file" style={{ width: 20 }} />
              <Typography variant="body2">{data?.fileName}</Typography>
            </Box>
          </a>
        )}
        <Typography
          sx={{
            fontSize: 9,
            textAlign: "right",
            display: "block",
            mt: "5px",
          }}
          color="rgba(0,0,0,0.6)"
          variant="caption"
        >
          {moment(data?.createdAt).format("hh:mm A")}
        </Typography>
      </Box>
    </Box>
  );
}

export default Message;
