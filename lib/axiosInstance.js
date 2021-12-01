import axios from 'axios';

const connection = axios.create({
  baseURL: '/api',
  timeout: 30000,
  // TODO Test impact of this setting.
  decompress: false
});

export default connection;
