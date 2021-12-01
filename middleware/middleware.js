import nextConnect from 'next-connect';
import database from './database';
import passport from '../lib/passport';
import cors from 'cors';

const middleware = nextConnect();
middleware
  .use(cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }))
  .use(database)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;
