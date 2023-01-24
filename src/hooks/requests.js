import { mongoDB } from '../database/mongo';
import * as Realm from 'realm-web';
const {
  BSON: { ObjectId },
} = Realm;

const requests = {};

requests.getStudents = async () => {
  try {
    const students = await mongoDB.collection('students').find();
    return students;
  } catch (err) {
    // TODO: Add message to display error fetching the data
    console.error(err);
    return [];
  }
};

requests.getEmployees = async () => {
  try {
    const employees = await mongoDB.collection('employees').find();
    return employees;
  } catch (err) {
    console.error(err);
    // TODO: Add message to display error fetching the data
    return [];
  }
};

requests.getEvents = async () => {
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
    // TODO: Add message to display error fetching the data
    console.error(err);
    return [];
  }
};

requests.getEventById = async eventId => {
  try {
    const event = await mongoDB.collection('events').aggregate([
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

requests.createEvent = async event => {
  try {
    const response = await mongoDB.collection('events').insertOne(event);

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

requests.updateEvent = async event => {
  try {
    const { _id, overseers, participants } = event;
    const response = await mongoDB.collection('events').updateOne(
      { _id }, // filter by
      {
        ...event,
        // ! Remember to only pass the ID 
        // ! Because the filter of Mongoose will not allow any other data
        overseers: overseers.map(overseer => overseer['_id']),
        participants: participants.map(student => student['_id']),
      } // Update data
    );

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

requests.addParticipants = async (eventTarget = {}, participantsToAdd = []) => {
  try {
    const response = await mongoDB.collection('events').updateOne(
      { _id: eventTarget._id },
      {
        $addToSet: {
          participants: { $each: participantsToAdd.map(({ _id }) => _id) },
        },
      }
    );

    return {
      ok: true,
      data: response,
    };
  } catch (err) {
    // TODO: Add message to display error fetching the data
    console.error(err);
    return { ok: false };
  }
};

export default requests;
