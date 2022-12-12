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
    const events = await mongoDB
      .collection('events')
      .aggregate([
        {
          $lookup: {
            from: 'employees',
            localField: 'overseers',
            foreignField: '_id',
            as: 'overseers'
          },
        },
        {
          $lookup: {
            from: 'students',
            localField: 'participants',
            foreignField: '_id',
            as: 'participants'
          },
        },
      ]);

    return events.map(event => ({
      id: ObjectId(events['_id']).toString(),
      ...event,
    }));
  } catch (err) {
    throw new Error(err);
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
    throw new Error(err);
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

    return {ok: true};
  } catch (err) {
    throw new Error(err);
  }
};
