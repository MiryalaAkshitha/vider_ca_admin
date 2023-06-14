import { http } from "api/http";

interface IUpdateData {
    data: {}
}

const getNotificationConstnats = () => {
    return http.get("/notifications-preferences");
};

const getPreferences = () => {
    return http.get(`/notifications-preferences/getPreferences`);
};

const updatePreference = ({ data }: IUpdateData) => {
    return http.put(`/notifications-preferences/update`, data);
};

export {
    getNotificationConstnats,
    getPreferences,
    updatePreference
}