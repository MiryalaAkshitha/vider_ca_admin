import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { signup } from "api/services/users";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { selectSignup } from "redux/reducers/signUpSlice";
import { SubmitType } from "types";
import { GreyButton } from "views/taskboard/styles";
import AddTeamMember from "./AddTeamMember";

function Team() {
  const snack = useSnack();
  const state = useSelector(selectSignup);
  const [open, setOpen] = useState(false);

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: (res) => {
      localStorage.setItem("token", res?.data?.access_token ?? "");
      window.location.href = "/";
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    const { token, step, ...data } = state;
    mutate({ ...data });
  };

  return (
    <>
      <Box>
        <Typography sx={{ mb: 1, textAlign: "center" }} variant="subtitle1">
          Team Details
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Please add your team members
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={4}>
            {state.teamMembers.map((member, index) => (
              <Box
                key={index}
                sx={{
                  background: "#FBF9F2",
                  p: 3,
                  borderRadius: "10px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle2" color="#0D47A1">
                    {member.fullName}
                  </Typography>
                  <Typography variant="caption" color="#222222">
                    {member.role}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="caption">
                    {member.mobileNumber}
                  </Typography>
                  <br />
                  <Typography variant="caption">{member.email}</Typography>
                </Box>
              </Box>
            ))}
            <Box
              onClick={() => setOpen(true)}
              sx={{
                background: "#FBF9F2",
                p: 3,
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Button startIcon={<Add />}>Add team member</Button>
            </Box>
          </Box>
          {isLoading ? (
            <Loader minHeight="80px" />
          ) : (
            <Box px={3} display="flex" gap={2} mt={4}>
              <GreyButton fullWidth>Skip for now</GreyButton>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Submit
              </Button>
            </Box>
          )}
        </form>
      </Box>
      <AddTeamMember open={open} setOpen={setOpen} />
    </>
  );
}

export default Team;
