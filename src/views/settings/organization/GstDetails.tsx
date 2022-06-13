import { CloseOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import UploadImage from "components/UploadImage";
import SectionWrapper from "./SectionWrapper";
import { StyledAttachment } from "./styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import {
  getGstDetails,
  getPanDetails,
  getSandboxToken,
} from "api/services/users";
import { useMutation, useQueryClient } from "react-query";
import { updateOrganization } from "api/services/organization";

function GstDetails({ state, setState }) {
  const queryClient = useQueryClient();


  const [gstLoading, setGstLoading] = useState(false);
  const [panLoading, setPanLoading] = useState(false);
  const [, setPanChanged] = useState(false);
  const [, setGstChanged] = useState(false);

  useEffect(() => {
    setPanChanged(state.panNumber !== state.panNumber);
    setGstChanged(state.gstNumber);
  }, [state]);

  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  const { mutate } = useMutation(updateOrganization, {
    onSuccess: () => {
      snack.success("Organization Profile Updated");
      queryClient.invalidateQueries("organization");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const verifyGst = async () => {
    if (!state.gstNumber) {
      snack.error("Please enter GST Number");
      return;
    }

    try {
      setGstLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getGstDetails({
        gstNumber: state.gstNumber,
        token: token?.data?.access_token,
      });

      const result: any = response.data;

      if (result.data.sts === "Active") {
        mutate({
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
    if (!state.panNumber) {
      snack.error("Please enter PAN Number");
      return;
    }

    try {
      setPanLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getPanDetails({
        panNumber: state?.panNumber,
        token: token?.data?.access_token,
      });

      const result: any = response?.data;
      if (result.data.status === "VALID") {
        mutate({
          id: state?.id,
          data: {
            ...state,
            firstName: result?.data?.first_name,
            lastName: result?.data?.last_name,
            fullName: result?.data?.full_name,
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
    const showGstActive = false
    const showGstVerify = true

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
    const showPanActive = false
    const showPanVerify = true

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
            value={state.gstNumber}
            onChange={handleChange}
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
              <a
                href={state.gstAttachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  gutterBottom
                  variant="body2"
                  color="rgba(0,0,0,0.8)"
                >
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
            value={state.panNumber}
            onChange={handleChange}
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
              <a
                href={state.panAttachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  gutterBottom
                  variant="body2"
                  color="rgba(0,0,0,0.8)"
                >
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
