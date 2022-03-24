import { getTask } from "api/services/tasks";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { createContext } from "react";

export const TaskDataContext = createContext({ taskData: null });

function TaskDataProvider({ children }) {
  const params = useParams();
  const [taskData, setTaskData] = useState(null);

  const { isLoading }: ResType = useQuery(["task", params.taskId], getTask, {
    onSuccess: (res: any) => {
      setTaskData(res.data);
    },
    cacheTime: 0,
  });

  if (isLoading) return <Loader minHeight="60vh" />;

  return (
    <TaskDataContext.Provider value={{ taskData }}>
      {children}
    </TaskDataContext.Provider>
  );
}

export default TaskDataProvider;
