import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getFields } from "api/services/forms";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { addField, selectForm } from "redux/reducers/formsSlice";
import { ResType } from "types";

export type FieldItem = {
  id: number;
  name: string;
};

export interface FieldResponse {
  data: Array<FieldItem>;
}

function FieldsContainer() {
  const { addedFields } = useSelector(selectForm);
  const dispatch = useDispatch();
  const snack = useSnack();
  const [search, setSearch] = useState<string>("");
  const { data, isLoading }: ResType = useQuery(["fields"], getFields);

  const handleAddField = (v: any) => {
    let existingField = addedFields.find((item: any) => item.field.id === v.id);
    if (existingField) {
      snack.error("Aready added.");
      return;
    }
    dispatch(addField(v));
  };

  if (isLoading) return <Loader />;

  return (
    <Box py={2}>
      <Box
        display="flex"
        mb={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" color="primary">
          Add Fields
        </Typography>
      </Box>
      <SearchContainer
        maxWidth="100%"
        placeHolder="Search for a field"
        onChange={(v) => setSearch(v)}
      />
      <Box>
        {data?.data
          .filter((item: any) => {
            return item?.name?.toLowerCase().indexOf(search.toLowerCase()) > -1;
          })
          ?.map((item: any, index: number) => (
            <Box
              key={index}
              mt={2}
              sx={{ cursor: "pointer" }}
              onClick={() => handleAddField(item)}
            >
              <Typography variant="body1">{item.name}</Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default FieldsContainer;
