import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box } from "@mui/material";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FloatingButton from "components/FloatingButton";
import AddEvent from "views/calendar/AddEvent";
import { useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "api/services/events";
import { ResponseType } from "types";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import moment from "moment";

function Calendar() {
  useTitle("Calendar");
  const [open, setOpen] = useState<boolean>(false);

  console.log(moment().toISOString());

  const { data, isLoading }: ResponseType = useQuery(["events"], getEvents);

  if (isLoading) return <Loader />;

  return (
    <Box p={3} sx={{ fontFamily: "muli_regular" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={
          data?.data?.map((item: any) => ({
            title: item?.title,
            start: new Date().toUTCString(),
            end: "2021-12-12T12:30:00",
          })) || []
        }
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
        dateClick={(info) => alert(info.dateStr)}
      />
      <FloatingButton onClick={() => setOpen(true)} />
      <AddEvent open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Calendar;
