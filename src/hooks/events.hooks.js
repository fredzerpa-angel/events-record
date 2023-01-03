import { useEffect, useState, useCallback } from 'react';
import requests from './requests';

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = useCallback(async () => {
    const fetchedEvents = await requests.getEvents();
    setEvents(fetchedEvents);
  }, []);

  const createEvent = useCallback(
    async event => {
      setIsLoading(true);

      const response = await requests.createEvent(event);
      if (response.ok) await getEvents();

      setIsLoading(false);
      return response;
    },
    [getEvents]
  );

  const updateEvent = async event => {
    setIsLoading(true);

    const response = await requests.updateEvent(event);
    if (response.ok) await getEvents();

    setIsLoading(false);
    return response;
  };

  const addParticipants = async (event, participants) => {
    setIsLoading(true);

    const response = await requests.addParticipants(event, participants);
    if (response.ok) await getEvents();

    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getEvents();
      setIsLoading(false);
    })();
  }, [getEvents]);

  return { events, createEvent, updateEvent, addParticipants, isLoading };
};

export default useEvents;
