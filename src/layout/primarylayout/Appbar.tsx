import { AddCircleOutlineRounded, NotificationsOutlined } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AppBar, Avatar, Badge, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { UserProfileContext, useUserData } from "context/UserProfile";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectGlobal, selectTitle } from "redux/reducers/globalSlice";
import AddEvent from "views/calendar/AddEvent";
import AddClient from "views/clients/AddClient";
import AddMember from "views/settings/manage-users/users/AddMember";
import AddLogHour from "views/settings/profile/LogHours/AddLogHour";
import CreateTask from "views/tasks/board/CreateTask";
import AccountMenu from "./AccountMenu";
import GlobalAdd from "./GlobalAdd";
import Notifications from "./Notifications";
import { ResType } from "types";
import { getNotificationsCount, updateNotifications } from "api/services/notifications";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { snack } from "components/toast";
import { handleError } from "utils/handleError";

type RefType = HTMLElement | null;

function Appbar() {
  const title = useSelector(selectTitle);
  const { loading } = useSelector(selectGlobal);
  const theme = useTheme();
  const { data } = useUserData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [globalAddAnchorEl, setGlobalAddAnchorEl] = useState<RefType>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<RefType>(null);
  const [globalActionType, setGlobalActionType] = useState<string>("");
  const { data: uData } = useContext(UserProfileContext);
  const [notifyCount,setNotifyCount]=useState(0);
  const [notifyData,setNotifyData]=useState<any>([]);

  console.log(uData);

  const { data:notificationsData, isLoading,refetch }: ResType = useQuery(
    "notifications",
    getNotificationsCount
  );

  useEffect(() => {
    if(loading){
      refetch();
    }
  }, [loading, refetch]);

  useEffect(() => {
    if (!isLoading) {
      setNotifyData(notificationsData?.data[0]);
      setNotifyCount(notificationsData?.data[1])
    }
  }, [notificationsData,isLoading]);

  const { mutateAsync } = useMutation(updateNotifications, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const setNotificationsToRead=async()=>{
     const notificationIds:number[]=notifyData.map(item=>item.id)
    setNotifyCount(0)
    await mutateAsync(notificationIds)
    refetch()
  }
  return (
    <>
      <AppBar
        sx={{
          width: {
            sm: `calc(100% - ${theme.spacing(9)} + 1px)`,
          },
          ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
        }}
        color="default"
        position="fixed"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box display="flex" gap={4} alignItems="center">
            <Box display="flex" gap={2}>
              <div>
                <IconButton
                  title="Global Add"
                  onClick={(e) => setGlobalAddAnchorEl(e.currentTarget)}
                >
                  <AddCircleOutlineRounded color="primary" />
                </IconButton>
              </div>
              <div>
              <IconButton

                
               
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setNotifAnchorEl(e.currentTarget);
                    setNotificationsToRead();
                   
                  
                  }}
                ><Badge badgeContent={notifyCount||0} color="secondary">
                  <NotificationsOutlined color="primary" />
                  </Badge>
                </IconButton>
              </div>
              <Link to="/settings/profile?tab=Profile">
                <IconButton>
                  <SettingsOutlinedIcon color="primary" />
                </IconButton>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="#182F53">
                {uData?.fullName}
              </Typography>
              <Typography variant="caption" color="#182F53">
                {uData?.role?.name}
              </Typography>
            </Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar src={data?.imageUrl} />
            </IconButton>
          </Box>
        </Toolbar>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="secondary" />
          </Box>
        )}
      </AppBar>
      <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <Notifications anchorEl={notifAnchorEl} setAnchorEl={setNotifAnchorEl} />
      <GlobalAdd
        anchorEl={globalAddAnchorEl}
        setAnchorEl={setGlobalAddAnchorEl}
        setGlobalActionType={setGlobalActionType}
      />
      <AddClient
        open={globalActionType === "Client"}
        setOpen={() => {
          setGlobalActionType("");
        }}
      />
      <AddMember
        open={globalActionType === "Member"}
        setOpen={() => {
          setGlobalActionType("");
        }}
      />
      <CreateTask
        open={globalActionType === "Task"}
        setOpen={() => {
          setGlobalActionType("");
        }}
      />
      <AddEvent
        open={globalActionType === "Event"}
        setOpen={() => {
          setGlobalActionType("");
        }}
      />
      <AddLogHour
        open={globalActionType === "Log Hour"}
        setOpen={() => {
          setGlobalActionType("");
        }}
      />
    </>
  );
}

export default Appbar;