import loadable from "@loadable/component";
import useQueryParams from "hooks/useQueryParams";
const AddClient = loadable(() => import("views/clients/clients/AddClient"));
const AddEvent = loadable(() => import("views/calendar/AddEvent"));
const AddTask = loadable(() => import("views/taskboard/board/CreateTask"));

function GlobalDrawers() {
  const { queryParams } = useQueryParams();

  return (
    <>
      {(() => {
        if (queryParams.createClient === "true") {
          return <AddClient />;
        }
        if (queryParams.createEvent === "true") {
          return <AddEvent />;
        }
        if (queryParams.createTask === "true") {
          return <AddTask />;
        }
        return null;
      })()}
    </>
  );
}

export default GlobalDrawers;
