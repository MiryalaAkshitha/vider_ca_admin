import React from "react";
import OverdueTable from "views/task-dashboard/task-by-service/overdue-table";
import WestIcon from "@mui/icons-material/West";

const ViewAllOverdueTasks = () => {
  return (
    <div>
      <WestIcon />
      <h3>Overdue Tasks</h3>
      <OverdueTable />
    </div>
  );
};

export default ViewAllOverdueTasks;
