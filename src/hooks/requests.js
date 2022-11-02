import { mongoDB } from '../database/database';
import { MOCKUP_EMPLOYEES } from '../__mocks__/employees';

export const fetchStudents = async () => {
  try {
    const students = await mongoDB.collection('students').find();
    console.log({students});
    return students;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedEmployees = JSON.parse(
          window.localStorage.getItem('employees')
        );
        if (savedEmployees?.length) return resolve(savedEmployees);

        const initialEmployees = MOCKUP_EMPLOYEES;
        window.localStorage.setItem(
          'employees',
          JSON.stringify(initialEmployees)
        );
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
    const events = await mongoDB.collection('events').find();
    return events;
  } catch (err) {
    throw new Error(err);
  }
};

export const addNewEvent = async event => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const events = JSON.parse(window.localStorage.getItem('events'));
        events.push({ id: events.at(-1).id + 1, ...event });
        window.localStorage.setItem('events', JSON.stringify(events));

        return resolve({ ok: true });
      }, 2000);
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const addNewParticipants = async (
  eventTarget = {},
  participantsToAdd = []
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const events = JSON.parse(window.localStorage.getItem('events'));
        const eventsUpdated = events.map(event => {
          if (event.id !== eventTarget.id) return event;

          return {
            ...event,
            participants: [...event.participants, ...participantsToAdd],
          };
        });

        window.localStorage.setItem('events', JSON.stringify(eventsUpdated));

        return resolve({ ok: true });
      }, 2000);
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
