import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createClient, updateLead } from "api/services/clients/clients";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { CLIENT_CATEGORIES } from "data/constants";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType, SubmitType } from "types";

interface StateProps {
  category: string;
  subCategory: string | null;
  displayName: string;
  tradeName: string;
  clientManager: string;
  mobileNumber: string;
  email: string;
  authorizedPerson :string;
  designation : string;
  clientPortalAccess:string
}

interface Props extends DialogProps {
  data: any;
}

function ConverLead({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<StateProps>({
    category: "",
    subCategory: null,
    displayName: "",
    tradeName: "",
    clientManager: "",
    mobileNumber: "",
    email: "",
    authorizedPerson :"",
    designation : "",
    clientPortalAccess:"no"
  });

  const { data: users, isLoading: userLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  useEffect(() => {
    if (open) {
      setState({ ...data, displayName: data?.name });
    }
  }, [data, open]);

  const { mutateAsync, isLoading } = useMutation(createClient, {
    onSuccess: (res) => {
      snack.success("Converted to client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutateAsync: mutateLead } = useMutation(updateLead, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("leads");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    if (e.target.name === "category") {
      setState({ ...state, category: e.target.value, subCategory: null });
      return;
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SubmitType) => {
    const tempstate = JSON.parse(JSON.stringify(state));
    tempstate['clientPortalAccess'] = "yes";
    try {
      e.preventDefault();
      await mutateAsync(tempstate);
      await mutateLead({
        id: data?.id,
        data: { ...tempstate, status: "converted" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === state.category
  )?.subCategories;

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Convert Lead to Client">
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
            value={state.displayName}
            size="small"
            label="Display Name"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            name="mobileNumber"
            size="small"
            label="Mobile Number"
            value={state.mobileNumber}
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
            value={state.email}
            label="Email ID"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
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
            name="authorizedPerson"
            label="Authorized Person"
            onChange={handleChange}
            size="small"
            value={state.authorizedPerson}
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="designation"
            label="Designation"
            onChange={handleChange}
            size="small"
            value={state.designation}
          />
          
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Convert to client"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default ConverLead;
