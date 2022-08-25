import React from "react";
import { Grid } from "@mui/material";
import TaskByServiceTable from "../task-by-service/service-table";
import OverdueTable from "../task-by-service/overdue-table";
export default function TaskByService() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TaskByServiceTable />
        </Grid>
        <Grid item xs={6}>
          <OverdueTable />
        </Grid>
      </Grid>
    </>
  );
}
export {};
