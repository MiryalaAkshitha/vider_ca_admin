import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createClient } from "api/services/client";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType, SubmitType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";

interface StateProps {
  category: string;
  subCategory: string | null;
  displayName: string;
  tradeName: string;
  clientManager: string;
  mobileNumber: string;
  email: string;
}

function AddClient() {
  const { queryParams, setQueryParams } = useQueryParams();
  const navigate = useNavigate();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    category: "",
    subCategory: null,
    displayName: "",
    tradeName: "",
    clientManager: "",
    mobileNumber: "",
    email: "",
  });
  let formRef = useRef<HTMLFormElement>(null);

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    "users",
    getUsers,
    {
      enabled: queryParams.createClient === "true",
    }
  );

  const handleChange = (e: any) => {
    if (e.target.name === "category") {
      setState({
        ...state,
        category: e.target.value,
        subCategory: null,
      });
      return;
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(createClient, {
    onSuccess: (res) => {
      snack.success("Client Created");
      navigate(
        `/clients/${res.data.id}/profile/?displayName=${res.data?.displayName}&clientId=${res.data?.clientId}`
      );
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate(state);
  };

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === state.category
  )?.subCategories;

  return (
    <DrawerWrapper
      open={queryParams.createClient === "true"}
      setOpen={() => {
        delete queryParams.createClient;
        setQueryParams({
          ...queryParams,
        });
      }}
      title="Add Client"
    >
      {userLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} ref={formRef}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            select
            value={state.category || ""}
            onChange={handleChange}
            required
            name="category"
            label="Category"
          >
            {CLIENT_CATEGORIES.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          {subCategories && (
            <TextField
              variant="outlined"
              fullWidth
              required
              sx={{ mt: 3 }}
              name="subCategory"
              value={state.subCategory || ""}
              onChange={handleChange}
              size="small"
              select
              label="Sub Category"
            >
              {subCategories.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="displayName"
            required
            onChange={handleChange}
            size="small"
            label="Display Name"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="tradeName"
            required
            onChange={handleChange}
            size="small"
            label="Trade Name"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={state.clientManager || ""}
            name="clientManager"
            size="small"
            label="Client Manager"
            select
          >
            {users?.data?.map((item: any, index: number) => (
              <MenuItem key={index} value={item?.id}>
                {item?.fullName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            name="mobileNumber"
            size="small"
            label="Mobile Number"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="email"
            required
            type="email"
            onChange={handleChange}
            size="small"
            label="Email ID"
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Client"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddClient;
