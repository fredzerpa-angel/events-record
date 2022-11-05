import * as Realm from 'realm-web';

export const mongoApp = new Realm.App({ id: 'data-qqkfy' });
export const mongoClient = mongoApp.currentUser?.mongoClient('ClusterAngel');
export const mongoDB = mongoClient?.db('angel');

export const mongoLogIn = async () => {
  // LogIn to MongoDB using API KEY
  const userData = await mongoApp.logIn(
    Realm.Credentials.apiKey(
      'jwb2rODg4LWyXHkhvIuwqDghl0QHFFadvHcB0IX3Mvq5VWtrBFaoZCLoHq60NSCz'
    )
  );

  return userData;
};
