import { useEffect, useState, useCallback } from 'react';
import { fetchEvents } from './requests';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getEvents = useCallback(async () => {
    try {
      const events = await fetchEvents();
      setEvents(events);
      setIsLoading(false);
    } catch (err) {
      setErrors(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getEvents();
  }, [getEvents]);

  return { events, isLoading, errors };
};
