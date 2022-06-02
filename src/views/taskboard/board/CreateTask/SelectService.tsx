import { Box, Typography } from "@mui/material";
import { getServices } from "api/services/services";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import { useState } from "react";
import { useQuery } from "react-query";
import { DialogProps, ResType } from "types";

interface Props extends DialogProps {
  setValue: any;
  watch: any;
}

function SelectService({ open, setOpen, setValue, watch }: Props) {
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery("services", getServices, {
    enabled: open,
  });

  const filteredData = useFilteredData(
    data?.data,
    ["name", "category", "subCategory"],
    search
  );

  const handleClick = (service: any) => {
    let feeAmount =
      watch("feeType") === "HOURLY"
        ? service?.hourlyPrice
        : service?.totalPrice;
    setValue("service", service);
    setValue("feeAmount", feeAmount || "");
    setOpen(false);
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title="Select Service">
      <SearchContainer
        placeHolder="Search by category or name"
        minWidth="100%"
        onChange={setSearch}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            height: 300,
            overflow: "auto",
            mx: -2,
            px: 2,
            mt: 2,
          }}
        >
          {filteredData?.map((item: any, index: number) => (
            <Box
              key={index}
              onClick={() => handleClick(item)}
              sx={{
                border: "1px solid rgba(0,0,0,0.3)",
                borderRadius: 1,
                mb: "10px",
                px: 1,
                py: "4px",
                cursor: "pointer",
              }}
            >
              <Typography variant="caption" color="rgba(0,0,0,0.6)">
                {item?.category}{" "}
                {item?.subCategory && `-- ${item?.subCategory}`}
              </Typography>
              <Typography variant="subtitle2">{item?.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </DialogWrapper>
  );
}

export default SelectService;
