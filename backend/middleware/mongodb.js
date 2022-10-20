import mongoose from 'mongoose';

const DB = handler => async (req, res) => {
  const connected = mongoose.connections[0].readyState == '1';
  if (connected) return handler(req, res);

  try {
    const isDev = process.env.ENV === 'dev';
    const db_host = process.env[isDev ? 'MONGODB_TEST_URI' : 'MONGODB_URI'];
    await mongoose.connect(db_host, {});
    console.log(`New Connection to MongoBD ENV: ${process.env.ENV}`);
    return handler(req, res);
  } catch (err) {
    console.log({Error: err});
  }
};

export default DB;
