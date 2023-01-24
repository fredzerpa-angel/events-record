import { useEffect, useState, useCallback, useContext } from 'react';
import { DateTime } from 'luxon';
import { AuthContext } from './auth.hooks';
import requests from './requests';

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useContext(AuthContext);

  const getEvents = useCallback(async () => {
    const fetchedEvents = await requests.getEvents();
    fetchedEvents.forEach(event => {
      event.startDate = DateTime.fromJSDate(event.startDate).toISODate();
      event.endDate = DateTime.fromJSDate(event.endDate).toISODate();
    })
    setEvents(fetchedEvents);
  }, []);

  const createEvent = useCallback(
    async event => {
      setIsLoading(true);

      // Add only Ids for Docs size optimization
      event.participants = event.participants.map(student => student._id);
      event.overseers = event.overseers.map(employee => employee._id);

      // Add extra meta data
      event.createdBy = profile;
      event.createdAt = DateTime.now().toJSDate(); // Common JS "new Date()" class subtracts 4 hours going to the prev day  
      event.updates = [];

      const response = await requests.createEvent(event);
      if (response.ok) await getEvents();

      setIsLoading(false);
      return response;
    },
    [getEvents, profile]
  );

  const updateEvent = useCallback(async event => {
    setIsLoading(true);

    // Add extra meta data
    event.updates.push({
      issuedBy: profile,
      issuedAt: DateTime.now().toJSDate(),
    });

    const response = await requests.updateEvent(event);
    if (response.ok) await getEvents();

    setIsLoading(false);
    return response;
  }, [getEvents, profile]);

  const addParticipants = useCallback(async (event, participants) => {
    setIsLoading(true);

    const response = await requests.addParticipants(event, participants);
    if (response.ok) await getEvents();

    setIsLoading(false);
    return response;
  }, [getEvents]);

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
