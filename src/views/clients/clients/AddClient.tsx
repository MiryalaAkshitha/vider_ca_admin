import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { createClient } from "api/services/client";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import FormRadio from "components/FormFields/FormRadio";
import { useState } from "react";
import axios from "axios";
import {
  createClientDefaultValues,
  CreateClientSchema,
} from "validations/createCllient";

function AddClient() {
  const [isGstverified, setIsGstverified] = useState(false);
  const [isPanCardverified, setIsPanCardverified] = useState(false);
  const [isloading, setLoading] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams();
  const navigate = useNavigate();
  const snack = useSnack();

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    "users",
    getUsers,
    {
      enabled: queryParams.createClient === "true",
    }
  );

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

  const { watch, control, handleSubmit, reset, getValues } = useForm({
    defaultValues: createClientDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateClientSchema),
  });

  const panValue = watch("panNumber");
  const gstValue = watch("gstNumber");

  const handleGstClick = async () => {
    try {
      setLoading(true);
      let token: any = await axios({
        url: "https://try.readme.io/https://api.sandbox.co.in/authenticate",
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
          "x-api-version": "1.0",
        },
      });
      let response: any = await axios.get(
        `https://api.sandbox.co.in/gsp/public/gstin/${gstValue}`,
        {
          headers: {
            Authorization: token?.data?.access_token,
            "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          },
        }
      );
      const result: any = response.data;
      console.log(result);
      reset({
        ...getValues(),
        legalName: result?.data?.lgnm,
        tradeName: result?.data?.tradeNam,
        placeOfSupply: result?.data?.pradr?.addr?.stcd,
        constitutionOfBusiness: result?.data?.ctb,
      });

      setIsGstverified(true);
      setLoading(false);
    } catch {
      setLoading(false);
      alert("Invalid GST Number");
    }
  };

  const handlePanClick = async () => {
    try {
      setLoading(true);
      let token: any = await axios({
        url: "https://try.readme.io/https://api.sandbox.co.in/authenticate",
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
          "x-api-version": "1.0",
        },
      });
      const consent = "y";
      const reason = "For KYC of User";

      let response: any = await axios.get(
        `https://api.sandbox.co.in/pans/${panValue}?consent=${consent}&reason=${reason}`,
        {
          headers: {
            Authorization: token?.data?.access_token,
            "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          },
        }
      );

      const data: any = response?.data;
      reset({
        ...getValues(),
        lastName: data?.data?.last_name,
        fullName: data?.data?.full_name,
      });
      setIsPanCardverified(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Invalid Pan Number");
    }
  };

  const onFormSubmit = (data: any) => {
    console.log(data);
  };

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
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box mt={2}>
            <FormSelect
              control={control}
              name="category"
              label="Client Category"
              options={[
                { value: "Individual", label: "Individual" },
                { value: "Company", label: "Company" },
              ]}
            />
          </Box>
          {watch("category") === "Individual" && (
            <>
              <Box mt={2}>
                <FormSelect
                  control={control}
                  name="clientManager"
                  label="Client Manager"
                  options={users?.data?.map((item: any) => ({
                    label: item.fullName,
                    value: item.id,
                  }))}
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="mobileNumber"
                  label="Client Mobile number"
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="email"
                  label="Client Mail Id"
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="panNumber"
                  label="PAN Number"
                />

                <Typography
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button onClick={handlePanClick} sx={{ color: "#F2353C" }}>
                    Get Details
                  </Button>
                </Typography>
              </Box>

              {watch("category") === "Individual" && isloading && <Loader />}

              {isPanCardverified &&
                watch("category") === "Individual" &&
                !isloading && (
                  <>
                    <Box mt={2}>
                      <FormInput
                        control={control}
                        name="lastName"
                        label="Last Name"
                      />
                    </Box>
                    <Box mt={2}>
                      <FormInput
                        control={control}
                        name="fullName"
                        label="Full Name"
                      />
                    </Box>
                  </>
                )}
            </>
          )}

          {watch("category") === "Company" && watch("category") === "Company" && (
            <>
              <Box mt={2}>
                <FormSelect
                  control={control}
                  name="clientManager"
                  label="Client Manager"
                  options={users?.data?.map((item: any) => ({
                    label: item.fullName,
                    value: item.id,
                  }))}
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="authorizedPersonName"
                  label="Authorized person name"
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="designation"
                  label="Designation"
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="mobileNumber"
                  label="Client Mobile number"
                />
              </Box>
              <Box mt={2}>
                <FormInput
                  control={control}
                  name="email"
                  label="Client Mail Id"
                />
              </Box>
              <Box mt={2}>
                <FormRadio
                  row
                  control={control}
                  name="gstRegistered"
                  label="Is this firm registered for GST?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </Box>
            </>
          )}

          {watch("gstRegistered") === "yes" && watch("category") === "Company" && (
            <Box mt={2}>
              <FormInput
                control={control}
                name="gstNumber"
                label="GST Number"
              />

              <Typography
                sx={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={handleGstClick} sx={{ color: "#F2353C" }}>
                  Get Details
                </Button>
              </Typography>
            </Box>
          )}
          {watch("gstRegistered") === "no" && watch("category") === "Company" && (
            <Box mt={2}>
              <FormInput
                control={control}
                name="panNumber"
                label="PAN Number"
              />

              <Typography
                sx={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={handlePanClick} sx={{ color: "#F2353C" }}>
                  Get Details
                </Button>
              </Typography>
            </Box>
          )}
          {watch("gstRegistered") === "yes" &&
            watch("category") === "Company" &&
            isloading && <Loader />}
          {isGstverified &&
            watch("gstRegistered") === "yes" &&
            watch("category") === "Company" && (
              <>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="legalName"
                    label="Legal Name"
                  />
                </Box>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="tradeName"
                    label="Trade Name"
                  />
                </Box>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="placeOfSupply"
                    label="State of Jurisdiction/Place of Supply"
                  />
                </Box>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="constitutionOfBusiness"
                    label="Constitution Of Business"
                  />
                </Box>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="panNumber"
                    label="Enter PAN Number"
                  />
                </Box>
              </>
            )}
          {isloading &&
            watch("gstRegistered") === "no" &&
            watch("category") === "Company" && <Loader />}
          {isPanCardverified &&
            watch("gstRegistered") === "no" &&
            watch("category") === "Company" && (
              <>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                  />
                </Box>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="fullName"
                    label="Full Name"
                  />
                </Box>
                <Box mt={2}>
                  <FormInput
                    control={control}
                    name="companyType"
                    label="Company Type"
                  />
                </Box>
              </>
            )}

          <LoadingButton
            loading={isLoading}
            fullWidth
            sx={{ mt: 3 }}
            type="submit"
            loadingColor="white"
            title="Create Client"
            color="secondary"
          />
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddClient;
