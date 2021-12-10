import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getRoles } from "api/services/roles";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResponseType } from "types";
import AddMember from "views/users/AddMember";
import UserCard from "views/users/UserCard";

function Users() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const { data, isLoading }: ResponseType = useQuery("users", getUsers);

  const { data: roles, isLoading: rolesLoading }: ResponseType = useQuery(
    "roles",
    getRoles
  );

  if (isLoading || rolesLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <SearchContainer
            placeHolder="Search by Name"
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
        <Box>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add Member
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3} sx={{ maxWidth: 1400, mt: 2 }}>
        {data?.data
          ?.filter((item: any) => {
            return (
              item?.firstName?.toLowerCase().indexOf(search.toLowerCase()) >
                -1 ||
              item?.lastName?.toLowerCase().indexOf(search.toLowerCase()) > -1
            );
          })
          ?.filter((item: any) => {
            return (
              item?.roles[0]?.name?.toLowerCase().indexOf(role.toLowerCase()) >
              -1
            );
          })
          ?.map((user: any, index: number) => (
            <Grid item xs={3} key={index}>
              <UserCard data={user} />
            </Grid>
          ))}
      </Grid>
      <AddMember open={open} setOpen={setOpen} />
    </>
  );
}

export default Users;
