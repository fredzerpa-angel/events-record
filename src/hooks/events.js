import { useEffect, useState, useCallback } from 'react';
import { fetchEvents } from './requests';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getStudents = useCallback(async () => {
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
    getStudents();
  }, [getStudents]);

  return { events, isLoading, errors };
};
