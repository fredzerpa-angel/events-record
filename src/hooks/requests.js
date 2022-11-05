import { mongoDB } from '../database/mongo';

export const fetchStudents = async () => {
  try {
    const students = await mongoDB.collection('students').find();
    return students;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await mongoDB.collection('employees').find();
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
