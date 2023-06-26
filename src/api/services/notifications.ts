import { http } from "api/http";

const saveToken = (data: any) => {
  return http.post("/notifications/token", data);
};

const getNotifications = ({ queryKey }) => {
  return http.get("/notifications", {
    params: {
      ...queryKey[1],
    },
  });
};

const getNotificationsCount=()=>{
  return http.get('/notifications/count')
}


const updateNotifications = ( data) => {
  return http.patch('/notifications/update', data);
};



export { saveToken, getNotifications,getNotificationsCount,updateNotifications };