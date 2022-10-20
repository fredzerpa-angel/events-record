import { MOCKUP_EMPLOYEES } from '../__mocks__/employees';
import { MOCKUP_EVENTS } from '../__mocks__/events';
import { MOCKUP_STUDENTS } from '../__mocks__/students';

export const fetchStudents = async () => {
  try {
    const students = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const students = MOCKUP_STUDENTS;
        resolve(students);
      }, 2000);
    })

    return students;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const employees = MOCKUP_EMPLOYEES;
        resolve(employees);
      }, 2000);
    })

    return employees;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEvents = async () => {
  try {
    const events = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const events = MOCKUP_EVENTS;
        resolve(events);
      }, 2000);
    })

    return events;
  } catch (err) {
    throw new Error(err);
  }
};
