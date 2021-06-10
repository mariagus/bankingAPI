// Contains callbacks for routing
const DbService = require("../Services/DbConnection");
const Accounts = require("../Services/Accounts");
const success = require("../Services/Responses").successful;
const failed = require("../Services/Responses").unsuccessful;
const ObjectId = require("mongodb").ObjectId;

const getAllAccounts = (req, res) => {
  DbService.connectToDb(async (db) => {
    const accounts = await Accounts.getAllAccounts(db);
    res.json(accounts);
  });
};

const getAccount = (req, res) => {
  const id = ObjectId(req.params.id);
  if (req.params.id.length !== 24) {
    return res.send("invalid ID");
  }
  DbService.connectToDb(async (db) => {
    const account = await Accounts.getAccount(db, id);
    if (account.length == 0) {
      return res.send("Woops");
    }
    return res.json(account);
  });
};

const deposit = (req, res) => {
  const id = ObjectId(req.body.id);
  const amount = req.body.amount;

  DbService.connectToDb(async (db) => {
    const account = await Accounts.deposit(db, id, amount);
    return account.modifiedCount === 1
      ? res.send(success())
      : res.send(failed());
  });
};

const withdraw = (req, res) => {
  const id = ObjectId(req.body.id);
  const amount = req.body.amount;
  DbService.connectToDb(async (db) => {
    const account = await Accounts.withdraw(db, id, amount);
    return account.modifiedCount === 1
      ? res.send(success())
      : res.send(failed());
  });
};

const addAccount = (req, res) => {
  const account = {
    name: req.body.name,
    balance: req.body.balance,
  };
  if (!account.name || !account.balance) {
    return res.send("invalid account information");
  }
  DbService.connectToDb(async (db) => {
    const result = await Accounts.addAccount(db, account);
    result.insertedCount === 1 ? res.send(success()) : res.send(failed());
  });
};
const transfer = (req, res) => {
  const id1 = ObjectId(req.body.id1);
  const id2 = ObjectId(req.body.id2);
  const amount = req.body.amount;
  DbService.connectToDb(async (db) => {
    const result = await Accounts.transfer(db, amount, id1, id2);
    result.modifiedCount > 0 ? res.send(success()) : res.send(failed());
  });
};

const deleteAccount = (req, res) => {
  const id = ObjectId(req.params.id);

  DbService.connectToDb(async (db) => {
    const result = await Accounts.deleteAccount(db, id);
    res.redirect("/accounts");
    return result;
  });
};

module.exports.getAllAccounts = getAllAccounts;
module.exports.getAccount = getAccount;
module.exports.addAccount = addAccount;
module.exports.deposit = deposit;
module.exports.withdraw = withdraw;
module.exports.transfer = transfer;
module.exports.deleteAccount = deleteAccount;
