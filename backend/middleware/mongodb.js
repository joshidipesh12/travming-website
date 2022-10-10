import mongoose from 'mongoose';

const DB = handler => async (req, res) => {
  const connected = mongoose.connections[0].readyState == '1';
  if (connected) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  const isProd = process.env.NODE_ENV === 'prod';
  const db_host = process.env[isProd ? 'MONGODB_URI' : 'MONGODB_TEST_URI'];
  console.log(`Connecting to MongoBD ENV: ${process.env.NODE_ENV}`);

  await mongoose.connect(db_host, {});
  return handler(req, res);
};

export default DB;
