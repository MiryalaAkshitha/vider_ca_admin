import { Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getRoles } from "api/services/roles";
import { getAllUsers, getUsers } from "api/services/users";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddMember from "views/settings/manage-users/users/AddMember";
import UserCard from "views/settings/manage-users/users/UserCard";

function Users() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const { data, isLoading }: ResType = useQuery("all-users", getAllUsers);

  const { data: roles, isLoading: rolesLoading }: ResType = useQuery("roles", getRoles);

  const getData = () => {
    let result = data?.data || [];
    if (search) {
      result = result?.filter((user: any) => {
        return user.fullName.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (role) {
      result = result?.filter((user: any) => {
        return user.role?.name === role;
      });
    }

    return result;
  };

  if (isLoading || rolesLoading) return <Loader />;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between">
        <SearchContainer
          value={search}
          placeHolder="Search by Name or tags"
          onChange={(v) => setSearch(v)}
        />
        <Box style={{ display: "flex", justifyContent: "space-between", width: "360px" }}>
          {/* <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            add to espo
          </Button> */}
          <TextField
            size="small"
            select
            onChange={(e) => setRole(e.target.value)}
            label="Filter by role"
            value={role}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">- None -</MenuItem>
            {roles?.data?.map((item: any, index: number) => (
              <MenuItem value={item?.name} key={index}>
                {item?.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Grid container spacing={3} sx={{ maxWidth: 1400, mt: 2 }}>
        {getData()?.map((user: any, index: number) => (
          <Grid item xs={3} key={index}>
            <UserCard data={user} type="user" />
          </Grid>
        ))}
      </Grid>
      <AddMember open={open} setOpen={setOpen} />
      {/* <AddMember open={openMember} setOpen={setOpenMember} /> */}
      {/* <AddMemberToEspo open={open} setOpen={setOpen} /> */}
      <FloatingButton
        onClick={() => {
          setOpen(true);
        }}
      />
    </Box>
  );
}

export default Users;
