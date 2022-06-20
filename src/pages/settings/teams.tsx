import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getTeams } from "api/services/users";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddTeam from "views/settings/teams/AddTeam";
import TeamCard from "views/settings/teams/TeamCard";

function Users() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading }: ResType = useQuery("teams", getTeams);

  const getData = () => {
    let result = data?.data;
    if (search) {
      result = result?.filter((item: any) => {
        return (
          item?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item?.tags?.some((tag: any) => {
            return tag?.toLowerCase().includes(search.toLowerCase());
          })
        );
      });
    }
    return result;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" gap={2}>
        <SearchContainer
          value={search}
          placeHolder="Search by Name"
          onChange={setSearch}
        />
      </Box>
      <Grid container spacing={3} sx={{ maxWidth: 1400, mt: 2 }}>
        {getData()?.map((team: any, index: number) => (
          <Grid item xs={4} key={index}>
            <TeamCard data={team} />
          </Grid>
        ))}
      </Grid>
      <AddTeam open={open} setOpen={setOpen} />
      <FloatingButton
        onClick={() => {
          setOpen(true);
        }}
      />
    </>
  );
}

export default Users;
