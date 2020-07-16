let mongo = require('mongodb');
let dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

reset().then(() => {
  process.exit();
});

async function reset() {
  let client = new mongo.MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await client.connect();
  let db = client.db(process.env.DB_NAME);
  console.log('Dropped:', await db.dropDatabase());
}
