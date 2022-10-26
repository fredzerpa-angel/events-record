import { useEffect, useState, useCallback } from 'react';
import { fetchEvents, addNewEvent } from './requests';

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = useCallback(async () => {
    const fetchedEvents = await fetchEvents();
    setEvents(fetchedEvents);
    setIsLoading(false);
  }, []);

  const createEvent = useCallback(
    async event => {
      setIsLoading(true);

      const response = await addNewEvent(event);
      if (response.ok) {
        // TODO: Change when server side is being developed
        const newEvent = { id: events.at(-1).id + 1, ...event };
        setEvents([...events, newEvent]);
      }

      setIsLoading(false);
      return response;
    },
    [events]
  );

  useEffect(() => {
    setIsLoading(true);
    getEvents();
  }, [getEvents]);

  return { events, createEvent, isLoading };
};

export default useEvents;
