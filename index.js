const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const round = require("mathjs").round;

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
    balance: round(req.body.balance, 2),
  };
  if (!newAccount.name || !newAccount.balance) {
    return res.send("fail!");
  }
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const result = await collection.insertOne(newAccount);

    if (result.insertedCount === 1) {
      return res.send({
        success: true,
        message: "new account saved",
        status: 200,
        data: newAccount,
      });
    }
  });
});
//deposit to account
app.put("/accounts/:id/deposit", (req, res) => {
  const idToFind = ObjectId(req.params.id);
  const amount = req.body.amount;

  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const result = await collection.updateOne(
      { _id: idToFind },
      { $inc: { balance: round(amount, 2) } }
    );
    if (result.modifiedCount === 1) {
      return res.send("done");
    } else {
      return res.send("fail");
    }
  });
});
//withdraw from account
app.put("/accounts/:id/withdraw", (req, res) => {
  const idToFind = ObjectId(req.params.id);
  const amount = req.body.amount;

  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const result = await collection.updateOne(
      { _id: idToFind },
      { $inc: { balance: round(-amount, 2) } }
    );
    if (result.modifiedCount === 1) {
      return res.send("done");
    } else {
      return res.send("fail");
    }
  });
});

app.put("/accounts/transfer/:id1/:id2", (req, res) => {
  const idAcctOrigin = ObjectId(req.params.id1);
  const idAcctDestination = ObjectId(req.params.id2);
  const amount = req.body.amount;

  if (!req.body.amount || typeof req.body.amount !== "number") {
    return res.send({
      success: false,
      message: "transfer failed",
      status: 400,
    });
  }

  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const balance = await collection.find({ _id: idAcctOrigin }).toArray();
    if (balance[0].balance < amount) {
      return res.send({
        success: false,
        message: "insufficient funds",
      });
    }
    const result1 = await collection.updateOne(
      { _id: idAcctOrigin },
      { $inc: { balance: round(-amount, 2) } }
    );
    if (result1.modifiedCount === 1) {
      const result2 = await collection.updateOne(
        { _id: idAcctDestination },
        { $inc: { balance: round(amount, 2) } }
      );
      if (result2.modifiedCount === 1) {
        return res.send({
          success: true,
          message: "transfer succeeded",
          status: 200,
        });
      }
    } else {
      return res.send({
        success: false,
        message: "transfer failed",
        status: 400,
      });
    }
  });
});

//delete account
app.delete("/accounts/:id", (req, res) => {
  const idToDelete = ObjectId(req.params.id);

  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const result = await collection.deleteOne({
      _id: idToDelete,
    });
    return res.send("deleted");
  });
});

app.listen(port);
