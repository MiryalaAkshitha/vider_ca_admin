import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import { getEvents } from "api/services/events";
import { getTasks } from "api/services/tasks";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddEvent from "views/calendar/AddEvent";
import ViewEvent from "views/calendar/ViewEvent";

function Calendar() {
  useTitle("Calendar");
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [data, setData] = useState({});

  const { data: events, isLoading }: ResType = useQuery(["events"], getEvents);
  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(
    ["tasks"],
    getTasks
  );

  const eventsData =
    events?.data?.map((item: any) => ({
      title: item?.title,
      date: moment(item?.date).format("YYYY-MM-DD"),
      backgroundColor: "#88B151",
      textColor: "white",
      id: item?.id,
    })) || [];

  const tasksData =
    tasks?.data?.map((item: any) => ({
      title: `${item?.name} - (${item?.client?.displayName})`,
      date: moment(item?.dueDate).format("YYYY-MM-DD"),
      backgroundColor: "#149ECD",
      textColor: "white",
      id: item?.id,
    })) || [];

  if (isLoading || tasksLoading) return <Loader />;

  const clickedevent = (value: any) => {
    if (value.event.backgroundColor !== "#88B151") return;
    let event = events?.data?.find((item: any) => item.id === +value.event.id);
    setViewOpen(true);
    setData(event);
  };

  return (
    <Box p={3} sx={{ fontFamily: "muli_regular", zIndex: "none" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[...eventsData, ...tasksData]}
        headerToolbar={{
          right: "prev,next today",
          center: "title",
          left: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        weekends={true}
        eventClick={clickedevent}
        dayMaxEventRows={3}
        displayEventTime={true}
        displayEventEnd={true}
        eventTextColor="black"
      />
      <FloatingButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <AddEvent open={open} setOpen={setOpen} />
      <ViewEvent open={viewOpen} setOpen={setViewOpen} data={data} />
    </Box>
  );
}

export default Calendar;
