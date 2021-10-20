import { Add } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getFields } from "api/forms";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import AddField from "./AddField";
import { useQuery, UseQueryResult } from "react-query";

export type FieldItem = {
  id: number;
  name: string;
};

export interface FieldResponse {
  data: Array<FieldItem>;
}

function FieldsContainer(props: any) {
  const { addField } = props;
  const [search, setSearch] = useState<string>("");
  const { data, isLoading }: UseQueryResult<FieldResponse, Error> = useQuery(
    ["fields"],
    getFields
  );

  return (
    <Box p={2}>
      <Box
        display='flex'
        mb={2}
        justifyContent='space-between'
        alignItems='center'>
        <Typography variant='subtitle1' color='primary'>
          Add Fields
        </Typography>
      </Box>
      <SearchContainer
        maxWidth='100%'
        placeHolder='Search for a field'
        onChange={(v) => setSearch(v)}
      />
      <Box>
        {data?.data
          .filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
          })
          ?.map((item, index) => (
            <Box
              mt={2}
              sx={{ cursor: "pointer" }}
              onClick={() => addField(item)}>
              <Typography variant='body1'>{item.name}</Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default FieldsContainer;
