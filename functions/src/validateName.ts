import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp();

const db = admin.firestore();

export const checkUser = (
  req: functions.https.Request,
  res: functions.Response<any>
) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  if (req.method !== 'GET') {
    return res.status(405).send(`${req.method} is not allowed. Use GET.`);
  }

  if (!req.query.hasOwnProperty('name')) {
    return res.status(400).send('No username provided.');
  }

  // Source: https://stackoverflow.com/a/52850529/2758318
  const isValidDocId = (id: any) =>
    id && /^(?!\.\.?$)(?!.*__.*__)([^/]{1,1500})$/.test(id);

  // Document Ids should be non-empty strings
  if (!isValidDocId(req.query.name)) {
    return res.status(400).send('Invalid username string.');
  }

  return db
    .collection('portfolios')
    .where('name', '==', req.query.name)
    .onSnapshot((snapshot) => {
      if (snapshot.docs.length === 0) {
        res.status(200);
        res.send('No existing user');
      } else {
        res.status(409);
        res.send('User already exist');
      }
    });
};
