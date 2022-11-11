import { useEffect, useState, useCallback } from 'react';
import { fetchEvents, addNewEvent, addNewParticipants } from './requests';

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
      // TODO: Change when server side is being developed
      if (response.ok) {
        getEvents();
      }

      setIsLoading(false);
      return response;
    },
    [getEvents]
  );

  const addParticipants = useCallback(async (event, participants) => {
    setIsLoading(true);

    const response = await addNewParticipants(event, participants);
    // TODO: Change when server side is being developed
    if (response.ok) {
      getEvents();
    }

    setIsLoading(false);
    return response;
  }, [getEvents]);

  useEffect(() => {
    setIsLoading(true);
    getEvents();
  }, [getEvents]);

  return { events, createEvent, addParticipants, isLoading };
};

export default useEvents;
