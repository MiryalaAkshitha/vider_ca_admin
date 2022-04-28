import { getTask } from "api/services/tasks";
import Loader from "components/Loader";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { createContext } from "react";
import { Alert, Box } from "@mui/material";

export const TaskDataContext = createContext(null);

function TaskDataProvider({ children }) {
  const params = useParams();
  const [taskData, setTaskData] = useState(null);

  const { isLoading, error }: ResType = useQuery(
    ["task", params.taskId],
    getTask,
    {
      onSuccess: (res: any) => {
        setTaskData(res.data);
      },
      cacheTime: 0,
    }
  );

  if (isLoading) return <Loader minHeight="60vh" />;

  if (!taskData || error) {
    return (
      <Box maxWidth={500} margin="auto" mt={5}>
        <Alert severity="error">{error?.message}</Alert>
      </Box>
    );
  }

  return (
    <TaskDataContext.Provider value={taskData}>
      {children}
    </TaskDataContext.Provider>
  );
}

export const useTaskData = () => useContext(TaskDataContext);

export default TaskDataProvider;
