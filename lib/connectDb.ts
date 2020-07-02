import { MongoClient } from 'mongodb';

let client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

async function connectDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(process.env.DB_NAME);
}

export default connectDb;
