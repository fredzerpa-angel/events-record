import { useEffect, useState, useCallback } from 'react';
import { fetchStudents } from './requests';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getStudents = useCallback(async () => {
    try {
      const students = await fetchStudents();
      setStudents(students);
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

  return { students, isLoading, errors };
};
