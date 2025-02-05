import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateTime } from "luxon";
import esLocale from '@fullcalendar/core/locales/es-us';
import { memo, useState } from "react";
import InfoEventModal from "./modals/events/info-event-modal";

const formatEventData = (eventData) => ({
  ...eventData,
  allDay: true,
  // FullCalendar stops right before the end date so we add another day to make it visible
  // An event with the end of 2018-09-03 will appear to span through 2018-09-02 but end before the start of 2018-09-03. 
  end: DateTime.fromJSDate(eventData.end).plus({ days: 1 }).toJSDate(),
  extendedProps: eventData, // Full Calendar removes the props, so we add them as extended props
})

const EventsCalendar = ({ events }) => {
  const [eventClicked, setEventClicked] = useState(null);

  const handleClose = (event, reason) => setEventClicked(null);

  const handleEventClick = (eventInfo) => {
    console.log({ eventInfo })
    const { event: { _def: { extendedProps: eventData } } } = eventInfo;
    setEventClicked(eventData);
  }

  const formattedEvents = events.map(formatEventData);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        locale={esLocale}
        events={formattedEvents}
        fixedWeekCount={false}
        dayMaxEvents={true} // true is specified, the number of events will be limited to the height of the day cell.
        eventClick={handleEventClick}
      // eventContent={renderEventContent} // custom reendr function
      // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      />
      <InfoEventModal open={!!eventClicked} closeModal={handleClose} eventData={eventClicked} />
    </>
  )
}

const EventsCalendarPropsAreEqual = (prevProps, nextProps) => {
  return prevProps.events.length === nextProps.events.length
}

export default memo(EventsCalendar, EventsCalendarPropsAreEqual);