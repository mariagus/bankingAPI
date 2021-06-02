const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = 5000;

app.use(express.json());

const url = "mongodb://root:password@localhost:27017";
const dbName = "bank";

const Client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToDb = (cb) => {
  Client.connect((err) => {
    let db = Client.db(dbName);
    cb(db);
  });
};

app.get("/accounts", (req, res) => {
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const data = await collection.find({}).toArray();
    res.json(data);
  });
});

app.get("/accounts/:id", (req, res) => {
  const idToFind = ObjectId(req.params.id);
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const data = await collection.find({ _id: idToFind }).toArray();
    res.json(data);
  });
});

app.post("/accounts", (req, res) => {
  const newAccount = {
    name: req.body.name,
    balance: req.body.balance,
  };
  if (newAccount.name && newAccount.balance) {
    connectToDb(async (db) => {
      const collection = db.collection("accounts");
      const result = await collection.insertOne(newAccount);

      if (result.insertedCount === 1) {
        res.send({
          success: true,
          message: "new account saved",
          status: 200,
          data: newAccount,
        });
      }
    });
  } else {
    res.sendStatus(500);
  }
});

app.put("/accounts/:id/moneyin", (req, res) => {});
app.put("/accounts/:id/moneyout", (req, res) => {});
app.delete("/accounts/:id", (req, res) => {});

app.listen(port);
