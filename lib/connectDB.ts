import { Db, MongoClient } from 'mongodb';

export async function connectDB(): Promise<Db> {
  let client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: false,
    useUnifiedTopology: false,
  });
  let conn = await client.connect();
  return conn.db('experimental');
}

export default connectDB;
