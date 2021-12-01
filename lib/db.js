import { MongoClient } from 'mongodb';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {

  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        keepAlive: 1
      };

      cached.promise = MongoClient.connect(process.env.MONGODB_URI, opts)
        .then(client => {
         // console.log('*** MongoClient connect | ', client);
          return {
            client
          };
        })
        .catch(error => {
          console.log('*** MongoClient Error | ', error);
          return null;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log('*** connectToDatabase() error', error);
  }
}
