import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import { ColumnType } from "components/Table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogProps } from "types";

interface ClientFilterProps extends DialogProps {
  defaultColumns: Array<ColumnType>;
  columns: Array<ColumnType>;
  setColumns: Dispatch<SetStateAction<Array<ColumnType>>>;
}

function CustomizeColumns(props: ClientFilterProps) {
  const { open, setOpen, columns, setColumns, defaultColumns } = props;
  const [state, setState] = useState<Array<ColumnType>>([]);

  useEffect(() => {
    setState(columns);
  }, [columns]);

  const handleChange = (index: number) => {
    const newState = [...state];
    newState[index].hide = !newState[index].hide;
    setState(newState);
  };

  const handleReset = () => {
    setColumns(defaultColumns);
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    setColumns(state);
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Customize Columns">
      <Grid container spacing={1}>
        {state.map((column: ColumnType, index: number) => (
          <Grid item xs={6} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleChange(index)}
                  color="secondary"
                  checked={!column.hide}
                />
              }
              label={column.title}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" gap={2} justifyContent="flex-end">
        <Button
          sx={{ mt: 3 }}
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={handleSubmit}
          color="secondary"
        >
          Apply
        </Button>
      </Box>
    </DrawerWrapper>
  );
}

export default CustomizeColumns;
