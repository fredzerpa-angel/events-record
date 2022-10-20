import { useEffect, useState, useCallback } from 'react';
import { fetchEmployees } from './requests';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getEmployees = useCallback(async () => {
    try {
      const employees = await fetchEmployees();
      setEmployees(employees);
      setIsLoading(false);
    } catch (err) {
      setErrors(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getEmployees();
  }, [getEmployees]);

  return { employees, isLoading, errors };
};
