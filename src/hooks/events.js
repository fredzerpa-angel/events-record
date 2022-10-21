import { useEffect, useState, useCallback } from 'react';
import { fetchEvents, addNewEvent } from './requests';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = useCallback(async () => {
    const fetchedEvents = await fetchEvents();
    setEvents(fetchedEvents);
    setIsLoading(false);
  }, []);

  const addEvent = useCallback(async event => {
    setIsLoading(true);

    const response = await addNewEvent(event);
    if (response.ok) {
      // TODO: Change when server side is being developed
      const newEvent = {...event, id: events.at(-1).id +1}
      setEvents([...events, newEvent]);
      setTimeout(() => setIsLoading(false), 1500)
    }
  }, [events]);

  useEffect(() => {
    setIsLoading(true);
    getEvents();
  }, [getEvents]);

  return { events, addEvent, isLoading };
};
