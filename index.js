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
// get all accounts
app.get("/accounts", (req, res) => {
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const data = await collection.find({}).toArray();
    res.json(data);
  });
});
//get individual account
app.get("/accounts/:id", (req, res) => {
  const idToFind = ObjectId(req.params.id);
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const data = await collection.find({ _id: idToFind }).toArray();
    res.json(data);
  });
});
//create new account
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
//add to account
app.put("/accounts/:id/deposit/:deposit", (req, res) => {
  const idToFind = ObjectId(req.params.id);
  const deposit = Number(req.params.deposit);
  console.log(req.params.deposit);
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const result = await collection.updateOne(
      { _id: idToFind },
      { $inc: { balance: deposit } }
    );
    if (result.modifiedCount === 1) {
      res.send("done");
    } else {
      res.send("fail");
    }
  });
});
//deduct from account
app.put("/accounts/:id/withdraw/:withdraw", (req, res) => {
  const idToFind = ObjectId(req.params.id);
  const withdraw = Number("-" + req.params.withdraw);
  console.log(req.params.withdraw);
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const result = await collection.updateOne(
      { _id: idToFind },
      { $inc: { balance: withdraw } }
    );
    if (result.modifiedCount === 1) {
      res.send("done");
    } else {
      res.send("fail");
    }
  });
});
//delete account
app.delete("/accounts/:id", (req, res) => {});

app.listen(port);
