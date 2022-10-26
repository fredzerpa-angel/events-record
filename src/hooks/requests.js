import { MOCKUP_EMPLOYEES } from '../__mocks__/employees';
import { MOCKUP_EVENTS } from '../__mocks__/events';
import { MOCKUP_STUDENTS } from '../__mocks__/students';

export const fetchStudents = async () => {
  try {
    const students = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedStudents = JSON.parse(window.localStorage.getItem('students'));
        if (savedStudents?.length) return resolve(savedStudents);


        const initialStudents = MOCKUP_STUDENTS;
        window.localStorage.setItem('students', JSON.stringify(initialStudents));
        return resolve(initialStudents);
      }, 2000);
    });

    return students;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedEmployees = JSON.parse(window.localStorage.getItem('employees'));
        if (savedEmployees?.length) return resolve(savedEmployees);


        const initialEmployees = MOCKUP_EMPLOYEES;
        window.localStorage.setItem('employees', JSON.stringify(initialEmployees));
        return resolve(initialEmployees);
      }, 2000);
    });

    return employees;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEvents = async () => {
  try {
    const events = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedEvents = JSON.parse(window.localStorage.getItem('events'));
        if (savedEvents?.length) return resolve(savedEvents);

        const initialEvents = MOCKUP_EVENTS;
        window.localStorage.setItem('events', JSON.stringify(initialEvents));
        return resolve(initialEvents);
      }, 2000);
    });

    return events;
  } catch (err) {
    throw new Error(err);
  }
};

export const addNewEvent = async event => {
  try {
    // TODO
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const events = JSON.parse(window.localStorage.getItem('events'));
        events.push({ id: events.at(-1).id + 1, ...event });
        window.localStorage.setItem('events', JSON.stringify(events));

        return resolve({ ok: true });
      }, 2000)
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
