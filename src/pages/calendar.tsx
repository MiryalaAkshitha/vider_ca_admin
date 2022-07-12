import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import { getDefaultEvents, getEvents } from "api/services/events";
import { getTasks } from "api/services/tasks";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { Permissions } from "data/permissons";
import AddEvent from "views/calendar/AddEvent";
import EventIndication from "views/calendar/EventIndication";
import ViewEvent from "views/calendar/ViewEvent";
import ViewGlobalEvent from "views/calendar/ViewGlobalEvent";

function Calendar() {
  useTitle("Calendar");
  const [viewOpen, setViewOpen] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [openGlobal, setOpenGlobal] = useState(false);

  const { data: events, isLoading }: ResType = useQuery(["events"], getEvents);
  const { data: defaultEvents, isLoading: defaultLoading }: ResType = useQuery(
    ["default-events"],
    getDefaultEvents
  );
  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(
    ["tasks"],
    getTasks
  );

  const eventsData = () => {
    return (
      events?.data?.map((item: any) => ({
        title: item?.title,
        date: moment(item?.date).format("YYYY-MM-DD"),
        backgroundColor: "#88B151",
        textColor: "white",
        id: item?.id,
      })) || []
    );
  };

  const defaultEventsData = () => {
    return (
      defaultEvents?.data?.map((item: any) => ({
        title: item?.title,
        date: moment(item?.date).format("YYYY-MM-DD"),
        backgroundColor: "#E44652",
        textColor: "white",
        id: item?.id,
      })) || []
    );
  };

  const tasksData = () => {
    return (
      tasks?.data?.map((item: any) => ({
        title: `${item?.name} - (${item?.client?.displayName})`,
        date: moment(item?.dueDate).format("YYYY-MM-DD"),
        backgroundColor: "#149ECD",
        textColor: "white",
        id: item?.id,
      })) || []
    );
  };

  const clickedevent = (value: any) => {
    let bgColor = value.event.backgroundColor;

    if (bgColor === "#88B151") {
      let event = events?.data?.find(
        (item: any) => item.id === +value.event.id
      );
      setViewOpen(true);
      setData(event);
    }

    if (bgColor === "#E44652") {
      let event = defaultEvents?.data?.find(
        (item: any) => item.id === +value.event.id
      );
      setOpenGlobal(true);
      setData(event);
    }
  };

  if (isLoading || tasksLoading || defaultLoading) return <Loader />;

  return (
    <Box px={3} py={1} sx={{ fontFamily: "muli_regular", zIndex: "none" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EventIndication color="#E44652" title="Events by Vider" />
        <EventIndication color="#149ECD" title="Task due dates" />
        <EventIndication color="#88B151" title="General Events" />
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[...eventsData(), ...defaultEventsData(), ...tasksData()]}
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
      <ValidateAccess name={Permissions.CREATE_CALENDAR}>
        <FloatingButton
          onClick={() => {
            setOpen(true);
          }}
        />
      </ValidateAccess>
      <AddEvent open={open} setOpen={setOpen} />
      <ViewEvent open={viewOpen} setOpen={setViewOpen} data={data} />
      <ViewGlobalEvent open={openGlobal} setOpen={setOpenGlobal} data={data} />
    </Box>
  );
}

export default Calendar;
