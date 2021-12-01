import bcrypt from 'bcryptjs';
import { getNextSequenceValue } from '../lib/api-helpers';
import { connectToDatabase } from '../lib/db';

export async function setUpDb(db) {
  db.collection('users').createIndex({ email: 1 }, { unique: true });
  db.collection('newsLetterSubscriber').createIndex({ email: 1 }, { unique: true });
  db.collection('customers').createIndex({ userId: 1 }, { unique: true });
  db.collection('dwollaBusinessCustomers').createIndex({ userId: 1 }, { unique: true });
  db.collection('paymentMethods').createIndex({ bankAccountID: 1 }, { unique: true });
  db.collection('loggedInUsers').createIndex({ _ts: 1 }, { expireAfterSeconds: 3600 });
}

export default async function database(req, res, next) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      // TODO find a graceful way to handle this case.
      return next();
    }

    const { client } = connection;

    if (client && client.isConnected()) {
      await setUpDb(client.db());
      req.dbClient = client;
      req.db = client.db();

      req.db
        .collection('users')
        .find()
        .toArray(async (err, users) => {
          if (err) {
            res.status(500).send('Internal Server Error!!!');
          } else {
            if (!users.length) {
              const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
              let date = new Date();
              getNextSequenceValue('user_id', req, async (id) => {
                const user = await req.db
                  .collection('users')
                  .insertOne({
                    id: id,
                    email: process.env.ADMIN_LOGIN_MAIL,
                    password: hashedPassword,
                    firstName: process.env.ADMIN_FIRST_NAME,
                    lastName: process.env.ADMIN_LAST_NAME,
                    role: [process.env.ADMIN_ROLE],
                    provider: process.env.ADMIN_PROVIDER,
                    created_at: date,
                    modified_at: date,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    numberUpdates: 0,
                    lastModifiedBy: null,
                    verified: true
                  })
                  .then(({ ops }) => ops[0]);

                delete user.password;
              });
            }
          }
        });
    } else {
      res.status(500).send('Could not connect to database.');
    }
    return next();
  } catch (err) {
    console.log('***database middleware error | ', err);
    return next();
  }
}
