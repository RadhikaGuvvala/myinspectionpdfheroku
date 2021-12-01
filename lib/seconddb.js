import { MongoClient } from 'mongodb';
//import mongoose, { Schema } from 'mongodb';
import { string } from 'prop-types';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let secondcached = { conn1: null, promise1: null }


export async function connectToSecondDatabase() {


  try {
   
    if (!secondcached.promise) {
        
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        keepAlive: 1
      };

      secondcached.promise = MongoClient.connect(process.env.SECOND_MG_URL, opts)
        .then(client => {
          console.log('*** MongoClient connect | ', client);
          return {
            client
          };
        })
        .catch(error => {
          console.log('*** MongoClient Error | ', error);
          return null;
        });
      
    }
   

    secondcached.conn = await secondcached.promise;

    return secondcached.conn;
  } catch (error) {
    console.log('*** connectToDatabase() error', error);
  }
}
