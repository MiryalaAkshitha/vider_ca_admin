import { ArrowBack } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getTeam } from "api/services/users";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import UserCard from "views/users/UserCard";

function ViewTeam() {
  const navigate = useNavigate();
  const params: any = useParams();
  const [search, setSearch] = useState<string>("");

  const { data, isLoading }: ResType = useQuery(
    ["team", params.teamId],
    getTeam
  );

  const getData = () => {
    let result = data?.data?.members;
    if (search) {
      result = result?.filter((item: any) => {
        return item?.fullName?.toLowerCase().includes(search.toLowerCase());
      });
    }
    return result;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Button
        onClick={() => {
          navigate("/settings/teams");
        }}
        startIcon={<ArrowBack />}
      >
        Team Details
      </Button>
      <Box display="flex" gap={2} mt={2}>
        <SearchContainer
          value={search}
          placeHolder="Search by Name"
          onChange={setSearch}
        />
      </Box>
      <Grid container spacing={3} sx={{ maxWidth: 1400, mt: 2 }}>
        {getData()?.map((team: any, index: number) => (
          <Grid item xs={3} key={index}>
            <UserCard data={team} type="team" teamId={data?.data?.id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ViewTeam;
