import React from "react";
import TaskByStatusTable from "views/task-dashboard/task-by-service/overdue-table";
import WestIcon from "@mui/icons-material/West";

const AllTaskByStatus = () => {
  return (
    <div>
      <WestIcon />
      <h3>Task Status by Employess</h3>
      <TaskByStatusTable />
    </div>
  );
};

export default AllTaskByStatus;
