import { Box, Typography, Avatar, Divider } from "@mui/material";
import LocalNotificationsDatePicker from "./LocalNotificationsDatePicker";

const LocalNotificationsBody = () => {
  const notificationsData = [
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Task",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Event",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Invoice",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Receivables",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Estimates",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Members",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Reports",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Services",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Ticket",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: "30px 20px", pr: 0 }}>
        <LocalNotificationsDatePicker />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "500px",
            overflowY: "scroll",
            marginTop: "20px",
          }}
        >
          {notificationsData.map((data, index) => {
            return (
              <>
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    gap: 1,
                    pr: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Avatar alt="Remy Sharp" />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "14px",
                        margin: "0 10px",
                      }}
                    >
                      {data.user} has added a new task{" "}
                      <span style={{ color: "#3174c4" }}>
                        "{data.category}" asfasfsafasfas
                      </span>{" "}
                      for Client{" "}
                      <span style={{ color: "#3174c4" }}>
                        "{data.name}" so sdf sd sdf sdf sd f
                      </span>
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      alignSelf: "flex-end",
                    }}
                  >
                    {data.dateTime}
                  </Typography>
                </Box>
                <Divider />
              </>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default LocalNotificationsBody;
