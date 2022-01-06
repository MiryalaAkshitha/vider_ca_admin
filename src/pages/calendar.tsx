import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import { getEvents } from "api/services/events";
import { getTasksAsOptions } from "api/services/tasks";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddEvent from "views/calendar/AddEvent";

function Calendar() {
  useTitle("Calendar");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading }: ResType = useQuery(["events"], getEvents);
  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(
    ["task-options"],
    getTasksAsOptions
  );

  const eventsData =
    data?.data?.map((item: any) => ({
      title: item?.title,
      start: `${item?.date}T${item?.startTime}`,
      end: `${item?.date}T${item?.endTime}`,
    })) || [];

  const tasksData =
    tasks?.data?.map((item: any) => ({
      title: `${item?.name} - (${item?.clientName})`,
      date: moment(item?.dueDate).format("YYYY-MM-DD"),
    })) || [];

  if (isLoading || tasksLoading) return <Loader />;

  return (
    <Box p={3} sx={{ fontFamily: "muli_regular" }}>
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
        eventColor="rgba(136, 177, 81,0.5)"
        dayMaxEventRows={3}
        displayEventTime={true}
        displayEventEnd={true}
        eventTextColor="black"
      />
      <FloatingButton onClick={() => setOpen(true)} />
      <AddEvent open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Calendar;
