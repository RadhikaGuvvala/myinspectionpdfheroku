import { session, promisifyStore } from 'next-session';

import { expressSession } from 'next-session';
const MongoStore = require('connect-mongo')(expressSession);

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient, // see how we use req.dbClient from the previous step
    stringify: false,
    ttl: 24 * 60 * 60 * 1000,
    autoRemove: 'interval',
    autoRemoveInterval: 10
  });
  return session({
    store: promisifyStore(mongoStore)
  })(req, res, next);
}
