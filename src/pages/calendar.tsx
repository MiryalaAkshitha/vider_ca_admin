import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import { getDefaultEvents, getEvents } from "api/services/events";
import { getTasks } from "api/services/tasks/tasks";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { Permissions } from "data/permissons";
import AddEvent from "views/calendar/AddEvent";
import EventIndication from "views/calendar/EventIndication";
import ViewEvent from "views/calendar/ViewEvent";
import ViewGlobalEvent from "views/calendar/ViewGlobalEvent";
import { useNavigate } from "react-router-dom";

function sum(n: number): number {
  if (n === 0) return n;

  return n + sum(n - 1);
}

console.log(sum(3));

function Calendar() {
  useTitle("Calendar");
  const navigate = useNavigate();
  const [viewOpen, setViewOpen] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [openGlobal, setOpenGlobal] = useState(false);

  const { data: events, isLoading }: ResType = useQuery(["events"], getEvents);
  const { data: defaultEvents, isLoading: defaultLoading }: ResType = useQuery(
    ["default-events"],
    getDefaultEvents
  );
  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(["tasks"], getTasks);

  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const events: any = [...eventsData(), ...defaultEventsData(), ...tasksData()];
    setCurrentEvents(events);
  }, [events, defaultEvents, tasks]);

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

  const eventIndicationClicked = (bgcolor: any) => {
    const events: any = [...eventsData(), ...defaultEventsData(), ...tasksData()];
    let filteredevents = events.filter((item: any) => item.backgroundColor === bgcolor);
    setCurrentEvents(bgcolor == '' ? events : filteredevents);
  }

  const clickedevent = (value: any) => {
    let bgColor = value.event.backgroundColor;

    if (bgColor === "#88B151") {
      let event = events?.data?.find((item: any) => item.id === +value.event.id);
      setViewOpen(true);
      setData(event);
    }

    if (bgColor === "#E44652") {
      let event = defaultEvents?.data?.find((item: any) => item.id === +value.event.id);
      setOpenGlobal(true);
      setData(event);
    }

    if (bgColor === "#149ECD") {
      navigate(`/task-board/${value.event.id}#details`);
    }
  };

  if (isLoading || tasksLoading || defaultLoading) return <Loader />;

  return (
    <Box px={3} py={1} sx={{ fontFamily: "muli_regular", zIndex: "none" }}>
      <FullCalendar
        contentHeight={500}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={currentEvents}
        headerToolbar={{
          right: "prev,next today",
          center: "title",
          left: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        firstDay = {1}       
        weekends={true}
        eventClick={clickedevent}
        dayMaxEventRows={3}
        displayEventTime={true}
        displayEventEnd={true}
        eventTextColor="black"
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EventIndication onClick={() => eventIndicationClicked('#E44652')} color="#E44652" title="Events by Vider" />
        <EventIndication onClick={() => eventIndicationClicked('#149ECD')} color="#149ECD" title="Task due dates" />
        <EventIndication onClick={() => eventIndicationClicked('#88B151')} color="#88B151" title="General Events" />
        <EventIndication onClick={() => eventIndicationClicked('')} color="#2C3E50" title="All" />
      </Box>
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
