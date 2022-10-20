import { MOCKUP_EVENTS } from '../__mocks__/events';
import { MOCKUP_STUDENTS } from '../__mocks__/students';

export const fetchStudents = async () => {
  try {
    const students = await MOCKUP_STUDENTS;
    return students;
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
