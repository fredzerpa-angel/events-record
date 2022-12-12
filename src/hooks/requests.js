import { mongoDB } from '../database/mongo';
import * as Realm from 'realm-web';
const {
  BSON: { ObjectId },
} = Realm;

export const fetchStudents = async () => {
  try {
    const students = await mongoDB.collection('students').find();
    return students;
  } catch (err) {
    console.error(err);
    // TODO: Add message to display error fetching the data
    return [];
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await mongoDB.collection('employees').find();
    return employees;
  } catch (err) {
    console.error(err);
    // TODO: Add message to display error fetching the data
    return [];
  }
};

export const fetchEvents = async () => {
  try {
    const events = await mongoDB.collection('events').aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'overseers',
          foreignField: '_id',
          as: 'overseers',
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: 'participants',
          foreignField: '_id',
          as: 'participants',
        },
      },
    ]);

    return events.map(event => ({
      id: ObjectId(event['_id']).toString(),
      ...event,
    }));
  } catch (err) {
    console.error(err);
    // TODO: Add message to display error fetching the data
    return [];
  }
};

export const fetchEventById = async eventId => {
  try {
    const event = await mongoDB
      .collection('events')
      .aggregate([
        { $limit: 1 },
        { $match: { _id: ObjectId(eventId) } },
        {
          $lookup: {
            from: 'employees',
            localField: 'overseers',
            foreignField: '_id',
            as: 'overseers',
          },
        },
        {
          $lookup: {
            from: 'students',
            localField: 'participants',
            foreignField: '_id',
            as: 'participants',
          },
        },
      ]);
    
    return event[0];
  } catch (err) {
    // TODO: Add message to display error fetching the data
    console.error(err);
    return {};
  }
};

export const addNewEvent = async event => {
  try {
    const eventToAdd = {
      ...event,
      overseers: event.overseers.map(({ _id }) => _id),
    };
    const response = await mongoDB.collection('events').insertOne(eventToAdd);
    return {
      ok: true,
      data: response,
    };
  } catch (err) {
    // TODO: Add message to display error fetching the data
    console.error(err);
    return {
      ok: false,
      error: err,
    };
  }
};

export const addNewParticipants = async (
  eventTarget = {},
  participantsToAdd = []
) => {
  try {
    const response = await mongoDB.collection('events').updateOne(
      { _id: eventTarget._id },
      {
        $addToSet: {
          participants: { $each: participantsToAdd.map(({ _id }) => _id) },
        },
      }
    );

    return { ok: true };
  } catch (err) {
    // TODO: Add message to display error fetching the data
    console.error(err);
    return { ok: false };
  }
};
