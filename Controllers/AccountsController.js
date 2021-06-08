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
  if (id.length !== 12) {
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
  const id = ObjectId(req.params.id);
  const amount = req.body.amount;
  DbService.connectToDb(async (db) => {
    const account = await Accounts.deposit(db, id, amount);
    account.insertedCount === 1 ? res.send(success()) : res.send(failed());
  });
};

const addAccount = (req, res) => {
  const account = {
    name: req.body.name,
    balance: req.body.balance,
  };
  if (!account.name || !account.balance) {
    return res.send(failed());
  }
  DbService.connectToDb(async (db) => {
    const result = await Accounts.addAccount(db, account);
    result.insertedCount === 1 ? res.send(success()) : res.send(failed());
  });
};

const deleteAccount = (req, res) => {
  const id = ObjectId(req.params.id);

  DbService.connectToDb(async (db) => {
    const result = await Accounts.deleteAccount(db, id);

    res.send("deleted");
  });
};

module.exports.getAllAccounts = getAllAccounts;
module.exports.getAccount = getAccount;
module.exports.addAccount = addAccount;
module.exports.deposit = deposit;
module.exports.deleteAccount = deleteAccount;
