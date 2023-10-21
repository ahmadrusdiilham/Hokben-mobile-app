const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = "DB_CH2";
const client = new MongoClient(uri);
let db = {};
async function connect() {
  try {
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.log(err, "dari mongo config");
  }
}
function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
// connect().catch(console.dir);
