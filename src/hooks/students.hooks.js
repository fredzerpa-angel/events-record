import { useEffect, useState, useCallback } from 'react';
import requests from './requests';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getStudents = useCallback(async () => {
    try {
      const students = await requests.getStudents();
      setStudents(students);
    } catch (err) {
      setErrors(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getStudents();
      setIsLoading(false);
    })();
  }, [getStudents]);

  return { students, isLoading, errors };
};

export default useStudents;