import { Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getRoles } from "api/services/roles";
import { getUsers } from "api/services/users";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddMember from "views/settings/users/AddMember";
import UserCard from "views/settings/users/UserCard";

function Users() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const { data, isLoading }: ResType = useQuery("users", getUsers);

  const { data: roles, isLoading: rolesLoading }: ResType = useQuery(
    "roles",
    getRoles
  );

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
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <SearchContainer
            value={search}
            placeHolder="Search by Name or tags"
            onChange={(v) => setSearch(v)}
          />
          <TextField
            size="small"
            select
            onChange={(e) => setRole(e.target.value)}
            label="Filter by role"
            value={role}
            sx={{ minWidth: 300 }}
          >
            <MenuItem value="">None</MenuItem>
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
      <FloatingButton
        onClick={() => {
          setOpen(true);
        }}
      />
    </>
  );
}

export default Users;
