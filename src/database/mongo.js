import * as Realm from 'realm-web'; 
import env from "react-dotenv";

export const mongoApp = new Realm.App({ id: env.MONGO_REALM_APP_ID });
export const mongoClient = mongoApp.currentUser?.mongoClient(env.MONGO_CLUSTER);
export const mongoDB = mongoClient?.db(env.MONGO_DATABASE);

export const mongoLogIn = async () => {
  // LogIn to MongoDB using API KEY
  const userData = await mongoApp.logIn(
    Realm.Credentials.apiKey(env.MONGO_REALM_API_KEY)
  );

  return userData;
};
