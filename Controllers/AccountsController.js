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

    if (result.insertedCount === 1) {
      return res.send(success());
    } else {
      return res.send(failed());
    }
  });
};

const deleteAccount = (req, res) => {
  const accountId = ObjectId(req.params.id);

  DbService.connectToDb(async (db) => {
    const result = await Accounts.deleteAccount(db, accountId);

    return res.send(success());
  });
};

module.exports.getAllAccounts = getAllAccounts;
module.exports.addAccount = addAccount;
module.exports.deleteAccount = deleteAccount;
