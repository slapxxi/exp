let mongo = require('mongodb');
let dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

let [, , numberOfEntries = 1000] = process.argv;
let docs = [];

numberOfEntries = parseInt(numberOfEntries, 10);

if (numberOfEntries > 1_000_000) {
  throw new Error('Provided number of entries cannot exceed 1 000 000');
}

for (let index = 0; index < numberOfEntries; index++) {
  docs.push({
    id: index,
    phoneNumber: `8900${preface(index, 7)}`,
    views: 3,
    comments: [
      {
        id: 0,
        author: 'Rachel',
        content: 'Very bad people',
        phoneType: 'scam',
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
      },
    ],
  });
}

seed().then(() => {
  process.exit();
});

async function seed() {
  let client = new mongo.MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await client.connect();
  let db = client.db(process.env.DB_NAME);
  await db.collection('phones').insertMany(docs);
}

function preface(n, max) {
  let diff = max - n.toString().length;
  return `${'0'.repeat(diff)}${n}`;
}
