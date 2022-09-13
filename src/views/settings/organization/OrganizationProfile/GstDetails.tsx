import { CloseOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import UploadImage from "components/UploadImage";
import SectionWrapper from "./SectionWrapper";
import { StyledAttachment } from "./styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { getGstDetails, getPanDetails, getSandboxToken } from "api/services/users";
import { useMutation, useQueryClient } from "react-query";
import { updateOrganization } from "api/services/organization";
import { useParams } from "react-router-dom";
import { updateBillingEntity } from "api/services/billingEntity";

function GstDetails({ state, setState, apiData }: any) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [gstLoading, setGstLoading] = useState(false);
  const [panLoading, setPanLoading] = useState(false);
  const [panChanged, setPanChanged] = useState(false);
  const [gstChanged, setGstChanged] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  useEffect(() => {
    if (apiData) {
      setPanNumber(apiData?.panNumber || "");
      setGstNumber(apiData?.gstNumber || "");
    }
  }, [apiData]);

  useEffect(() => {
    setPanChanged(apiData?.panNumber !== panNumber);
    setGstChanged(apiData?.gstNumber !== gstNumber);
  }, [panNumber, gstNumber, apiData]);

  const { mutate } = useMutation(updateOrganization, {
    onSuccess: () => {
      snack.success("Organization Profile Updated");
      queryClient.invalidateQueries("organization");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: mutateBillingEntity } = useMutation(updateBillingEntity, {
    onSuccess: () => {
      snack.success("Billing entity profile updated");
      queryClient.invalidateQueries("billing-entity");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const update = params.billingEntityId ? mutateBillingEntity : mutate;

  const verifyGst = async () => {
    if (!gstNumber) {
      snack.error("Please enter GST Number");
      return;
    }

    try {
      setGstLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getGstDetails({
        gstNumber: gstNumber,
        token: token?.data?.access_token,
      });

      const result: any = response.data;

      if (result.data.sts === "Active") {
        update({
          id: state?.id,
          data: {
            ...state,
            legalName: result?.data?.lgnm,
            tradeName: result?.data?.tradeNam,
            placeOfSupply: result?.data?.pradr?.addr?.stcd,
            constitutionOfBusiness: result?.data?.ctb,
            buildingName: result?.data?.pradr?.addr?.bnm,
            street: result?.data?.pradr?.addr?.st,
            city: result?.data?.pradr?.addr?.dst,
            state: result?.data?.pradr?.addr?.stcd,
            pincode: result?.data?.pradr?.addr?.pncd,
            gstNumber: gstNumber,
            gstVerified: true,
          },
        });
      } else {
        snack.error("GST Number is not active");
      }
    } catch (e: any) {
      snack.error(e.response.data.message);
    } finally {
      setGstLoading(false);
    }
  };

  const verifyPan = async () => {
    if (!panNumber) {
      snack.error("Please enter PAN Number");
      return;
    }

    try {
      setPanLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getPanDetails({
        panNumber: panNumber,
        token: token?.data?.access_token,
      });

      const result: any = response?.data;
      if (result.data.status === "VALID") {
        update({
          id: apiData?.id,
          data: {
            ...state,
            firstName: result?.data?.first_name,
            lastName: result?.data?.last_name,
            fullName: result?.data?.full_name,
            panNumber: panNumber,
            panVerified: true,
          },
        });
      } else {
        snack.error("Invalid PAN Number");
      }
    } catch (e: any) {
      snack.error(e.response.data.message);
    } finally {
      setPanLoading(false);
    }
  };

  const GstAdornment = () => {
    const showGstActive = state?.gstVerified && !gstChanged;
    const showGstVerify = !state?.gstVerified || gstChanged;

    return (
      <>
        {gstLoading && <CircularProgress size="1rem" />}
        {showGstActive && !gstLoading && (
          <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
        )}
        {showGstVerify && !gstLoading && (
          <Button color="error" size="small" onClick={verifyGst}>
            Verify
          </Button>
        )}
      </>
    );
  };

  const PanAdornment = () => {
    const showPanActive = state?.panVerified && !panChanged;
    const showPanVerify = !state?.panVerified || panChanged;

    return (
      <>
        {panLoading && <CircularProgress size="1rem" />}
        {showPanActive && !panLoading && (
          <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
        )}
        {showPanVerify && !panLoading && (
          <Button color="error" size="small" onClick={verifyPan}>
            Verify
          </Button>
        )}
      </>
    );
  };

  return (
    <SectionWrapper title="GST Information">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GST Number"
            name="gstNumber"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            InputProps={{
              endAdornment: <GstAdornment />,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.6)">
            GST Attachment
          </Typography>
          {state.gstAttachment ? (
            <StyledAttachment>
              <a href={state.gstAttachmentUrl} target="_blank" rel="noopener noreferrer">
                <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.8)">
                  {state.gstAttachment}
                </Typography>
              </a>
              <CloseOutlined
                onClick={() =>
                  setState((draft: any) => {
                    draft.gstAttachment = "";
                  })
                }
                sx={{ cursor: "pointer" }}
                fontSize="small"
              />
            </StyledAttachment>
          ) : (
            <UploadImage
              name="gstAttachment"
              accept={["image/jpg", "image/jpeg", "application/pdf"]}
              widthoutIcon
              sx={{
                minHeight: "80px",
              }}
              onChange={(v) =>
                setState((draft: any) => {
                  draft.gstAttachment = v;
                })
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="PAN Number"
            name="panNumber"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            InputProps={{
              endAdornment: <PanAdornment />,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.6)">
            Pancard Attachment
          </Typography>
          {state.panAttachment ? (
            <StyledAttachment>
              <a href={state.panAttachmentUrl} target="_blank" rel="noopener noreferrer">
                <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.8)">
                  {state.panAttachment}
                </Typography>
              </a>
              <CloseOutlined
                onClick={() =>
                  setState((draft: any) => {
                    draft.panAttachment = "";
                  })
                }
                sx={{ cursor: "pointer" }}
                fontSize="small"
              />
            </StyledAttachment>
          ) : (
            <UploadImage
              name="panAttachment"
              accept={["image/jpg", "image/jpeg", "application/pdf"]}
              widthoutIcon
              sx={{
                minHeight: "80px",
              }}
              onChange={(v) =>
                setState((draft: any) => {
                  draft.panAttachment = v;
                })
              }
            />
          )}
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default GstDetails;
