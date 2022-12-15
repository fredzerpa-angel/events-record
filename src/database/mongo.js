import * as Realm from 'realm-web'; 
export const mongoApp = new Realm.App({ id: process.env.MONGO_REALM_APP_ID });
export const mongoClient = mongoApp.currentUser?.mongoClient(process.env.MONGO_CLUSTER);
export const mongoDB = mongoClient?.db(process.env.MONGO_DATABASE);

export const mongoLogIn = async () => {
  // LogIn to MongoDB using API KEY
  const userData = await mongoApp.logIn(
    Realm.Credentials.apiKey(process.env.MONGO_REALM_API_KEY)
  );

  return userData;
};
