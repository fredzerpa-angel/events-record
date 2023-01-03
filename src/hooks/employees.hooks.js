import { useEffect, useState, useCallback } from 'react';
import requests from './requests';

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  
  const getEmployees = useCallback(async () => {
    try {
      const employees = await requests.getEmployees();
      setEmployees(employees);
    } catch (err) {
      setErrors(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getEmployees();
      setIsLoading(false);
    })();
  }, [getEmployees]);

  return { employees, isLoading, errors };
};

export default useEmployees;