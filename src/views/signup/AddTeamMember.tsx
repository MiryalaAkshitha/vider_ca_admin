import DialogWrapper from "components/DialogWrapper";
import { Box, Button, TextField } from "@mui/material";
import { getAllRoles } from "api/services/roles";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { handleTeamMember } from "redux/reducers/signUpSlice";
import { ResType, SubmitType } from "types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function AddTeamMember({ open, setOpen }: Props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    role: "",
    fullName: "",
    email: "",
    mobileNumber: "",
  });

  const { data }: ResType = useQuery("roles", getAllRoles, { enabled: open });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: SubmitType) => {
    e.preventDefault();
    dispatch(handleTeamMember(state));
    setState({
      role: "",
      fullName: "",
      email: "",
      mobileNumber: "",
    });
    setOpen(false);
  };

  return (
    <DialogWrapper title="Add team member" open={open} setOpen={setOpen}>
      <form onSubmit={handleAdd}>
        <Box>
          <TextField
            required
            onChange={handleChange}
            value={state.role}
            label="Role"
            size="small"
            name="role"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value=""></option>
            {data?.data?.map((role: any, index: number) => (
              <option value={role?.name} key={index}>
                {role?.name}
              </option>
            ))}
          </TextField>
          <TextField
            sx={{ mt: 2 }}
            required
            onChange={handleChange}
            value={state.fullName}
            label="Fullname"
            size="small"
            name="fullName"
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            required
            onChange={handleChange}
            value={state.email}
            label="Email"
            size="small"
            name="email"
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            required
            onChange={handleChange}
            value={state.mobileNumber}
            label="Mobile Number"
            size="small"
            name="mobileNumber"
            fullWidth
          />
        </Box>
        <Box mt={3} textAlign="right">
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default AddTeamMember;
