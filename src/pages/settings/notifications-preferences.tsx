import { Box, Breadcrumbs, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { getNotificationConstnats, getPreferences, updatePreference } from "api/notifications-preferences-service";
import { useMutation, useQuery } from "react-query";
import { ResType } from "types";
import PermissonsAccordionPreferences from "views/settings/manage-users/roles-permissions/Permissions-preferences";
//import Notifications from "views/settings/manage-users/roles-permissions/Notifications-preferneces-one";
import { LinkRouter } from "components/BreadCrumbs";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import BottomBar from "components/BottomBar";
import { snack } from "components/toast";
import NewSearchContainer from "components/SearchContainer";

function NotificationsPreferences() {

    const { data: notificationsConstants, isLoading }: ResType = useQuery(
        "pushNotifications",
        getNotificationConstnats
    );

    const parentGrouped = [
        "Push Notifications",
        "Mail Notifications",
    ];
    const forData = {
        "Push Notifications": "Push_Notification",
        "Mail Notifications": "Mail_Notification"
    };

    const { queryParams, setQueryParams } = useQueryParams();
    const [pushOriginalState, setPushOriginalState] = useState<string[]>([]);
    const [pushPermissions, setPushPermissons] = useState<string[]>([]);
    const [emailOriginalState, setEmailOriginalState] = useState<string[]>([]);
    const [emailPermissions, setEmailPermissons] = useState<string[]>([]);
    const [filters, setFilters] = useState({ search: "" });


    const active = queryParams.tab || parentGrouped[0];

    const labelGrouped = notificationsConstants?.data?.[forData[active]];
    const filteredObj = labelGrouped && Object.fromEntries(
        Object.entries(labelGrouped).filter(([key, value]: [string, unknown]) =>
            typeof value === 'string' && value.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())
        )
    );
    console.log(filteredObj);

    const { data, isLoading: loading }: ResType = useQuery("preferences", getPreferences, {
        onSuccess: (res: any) => {
            const result = res.data
            console.log(result)
            const { email, push } = result;
            const pushArray: string[] = Object.keys(push);
            setPushOriginalState(pushArray);
            setPushPermissons(pushArray);
        },
    });

    const { mutateAsync } = useMutation(updatePreference, {
        onSuccess: () => {
            snack.success("Preferences Updated");
        },
        onError: (err: any) => {
            snack.error(err.response.data.message);
        },
    });

    const handleUpdatePermissons = async () => {
        await mutateAsync({
            //   id: data?.data?.id,
            data: { pushPermissions },
        });
    };

    const handlePermissionChange = (preference: string) => {
        let filtered: string[] = [...pushPermissions];
        if (pushPermissions.includes(preference)) {
            filtered = pushPermissions.filter((item: any) => item !== preference);
        } else {
            filtered.push(preference);
        }
        setPushPermissons(filtered);
    };
    if (isLoading) return <Loader />;


    return <>
        <Box p={3} pb={12}>
            <Typography sx={{ mb: 1 }} variant="subtitle1">
                Permissions
            </Typography>
            <Box display="flex" gap={2}>
                <List
                    sx={{
                        width: 200,
                        borderRadius: "1px solid #e0e0e0",
                        position: "sticky",
                        top: 180,
                        py: 0,
                    }}
                >
                    {parentGrouped.map((item) => (
                        <ListItemButton
                            onClick={() => setQueryParams({ tab: item })}
                            onClickCapture={() => setFilters({ search: "" })}
                            selected={active === item}
                            sx={{
                                ...(active === item && {
                                    borderRight: "3px solid red",
                                    borderRadius: "2px",
                                }),
                            }}
                        >
                            <ListItemText primary={<Typography variant="body2">{item}</Typography>} />

                        </ListItemButton>

                    ))}

                </List>


                <Box flex={1}>
                    <NewSearchContainer
                        value={filters.search}
                        debounced
                        minWidth="400px"
                        onChange={(v) => {
                            setFilters({
                                ...filters,
                                search: v,
                            });
                        }}
                        placeHolder="Search Notifications"
                    />
                    <PermissonsAccordionPreferences
                        label={active}
                        data={filteredObj === undefined ? labelGrouped : filteredObj}
                        permissions={pushPermissions}
                        handlePermissionChange={handlePermissionChange}
                    />
                </Box>
            </Box>
            <BottomBar
                data={pushOriginalState}
                state={pushPermissions}
                onCancel={() => setPushPermissons(pushOriginalState)}
                onUpdate={handleUpdatePermissons}
            />
        </Box>
    </>

}

export default NotificationsPreferences




function typeOf(preference: string): any {
    throw new Error("Function not implemented.");
}

