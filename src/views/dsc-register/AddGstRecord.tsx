import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createClient } from "api/services/clients/clients";
import { createDscRegister, getClients } from "api/services/clients/dsc-register";
import { createGstrClient } from "api/services/clients/gstr-clients";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
// import { snack } from "components/toast";
import _ from "lodash";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
// import { error } from "console";
// import { getGstReturnResponse, getSandboxToken, signup } from "api/services/users";

interface StateProps {
    sno: any;
    client: any;
    contactPerson: any;
    holderName: string;
    email: string;
    mobileNumber: string;
    expiryDate: string | null;
    password: string;
    tokenNumber: string;
    panNumber: string;
    holderDesignation: string;
    gstNumber: string;
    FY: string;
}

let initialState = {
    sno: null,
    client: null,
    contactPerson: null,
    holderName: "",
    email: "",
    mobileNumber: "",
    expiryDate: null,
    password: "",
    tokenNumber: "",
    panNumber: "",
    holderDesignation: "",
    gstNumber: "",
    FY: "",
    id: null,
};

function AddGstRecord({ open, setOpen, clientList, setClientList, title }) {


    const [state, setState] = useState<StateProps>(_.cloneDeep(initialState));
    const [clients, setClients] = useState<any[]>([]);
    const filterClients = useState
    const formRef = useRef<HTMLFormElement>(null);
    const queryClient = useQueryClient();
    //const [optionClients, setOptionClients] = useState<any[]>([]);

    const { data, isLoading: loading }: ResType = useQuery(
        [
            "clients",
        ],
        getClients, {
        onSuccess: (res: any) => {
            const clientsData = res?.data;

            setClients(clientsData)




        }
    });

    const gstrClientIds = clientList?.map(item => item?.client?.id);

    const optionClients = clients.filter(item => !(gstrClientIds.includes(item.id)));










    const { mutate, isLoading } = useMutation(createGstrClient, {
        onSuccess: (res) => {
            snack.success("Gstr added successfully");
            queryClient.invalidateQueries("clients");
            setState(_.cloneDeep(initialState))
            setOpen(false);


        },
        onError: (err: any) => {
            snack.error(err.response.data.message);
        },
    });




    const getGstReturn = async (e: any) => {
        e.preventDefault()
        if (state.client !== null && state.client.gstVerified) {



            mutate({
                ...state.client,
                gstrType: title.split(" ")[1]

            });


        } else {
            setState(_.cloneDeep(initialState))
            snack.error("Please Enter Valid Details")
        }
    }


    return (
        <DrawerWrapper
            open={open}
            setOpen={() => {
                setOpen(false);
                setState(_.cloneDeep(initialState));
            }}
            title={title}
        >
            <Box>
                <form ref={formRef} onSubmit={getGstReturn}>
                    <Autocomplete
                        size="small"
                        onChange={(_, value) => {
                            setState({
                                ...state,
                                holderName: "",
                                email: "",
                                mobileNumber: "",
                                contactPerson: null,
                                client: value,
                            });
                        }}
                        value={state.client}
                        options={optionClients || []}
                        getOptionLabel={(option: any) => option.displayName}
                        fullWidth
                        renderInput={(params) => <TextField {...params} size="small" label="Select Client" />}
                    />
                    <br />
                    <Autocomplete
                        size="small"
                        onChange={(_, value) => {
                            setState({
                                ...state,
                                holderName: "",
                                email: "",
                                mobileNumber: "",
                                contactPerson: null,
                                client: value,
                            });
                        }}
                        value={state.client}
                        options={data?.data.client || []}
                        getOptionLabel={(option: any) => option.gstNumber}
                        fullWidth
                        renderInput={(params) => <TextField {...params} size="small" label="GSTIN" />}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                        <LoadingButton
                            loading={false}
                            fullWidth
                            type="submit"
                            loadingColor="white"
                            title="Submit"
                            color="secondary"
                        />
                    </Box>
                </form>
            </Box>
        </DrawerWrapper>
    );
}

export default AddGstRecord;