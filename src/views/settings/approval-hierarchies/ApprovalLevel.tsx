import { DeleteOutline, KeyboardArrowUpOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleApprovalLevel,
  removeApprovalLevel,
} from "redux/reducers/approvalsSlice";

const ApprovalLevel = ({ users, roles, data, index }: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleChange = (e: any) => {
    dispatch(
      handleApprovalLevel({
        index,
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <Box
      sx={{
        border: "1px solid #E0E0E0",
        background: "#F9FAFC",
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderBottom: open ? "1px solid #E0E0E0" : "none",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="body1" sx={{ lineHeight: "20px" }}>
            Level {index + 1}
          </Typography>
          <IconButton
            size="small"
            onClick={() => dispatch(removeApprovalLevel(index))}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Box>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          <KeyboardArrowUpOutlined fontSize="small" />
        </IconButton>
      </Box>
      {open && (
        <Box p={2}>
          <TextField
            label="Role"
            variant="outlined"
            size="small"
            sx={{ background: "white" }}
            select
            value={data.roleId}
            fullWidth
            name="roleId"
            onChange={handleChange}
          >
            {roles?.map((role: any) => (
              <MenuItem value={role?.id} key={role?.id}>
                {role?.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mt: 2, background: "white" }}
            label="User"
            variant="outlined"
            size="small"
            select
            fullWidth
            value={data.userId}
            name="userId"
            onChange={handleChange}
          >
            {users?.map((user: any) => (
              <MenuItem value={user?.id} key={user?.id}>
                {user?.fullName}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    </Box>
  );
};

export default ApprovalLevel;
