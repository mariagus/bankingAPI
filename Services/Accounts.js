const getAllAccounts = async (db) => {
  const collection = db.collection("accounts");
  const result = await collection.find({}).toArray();
  return result;
};

const getAccount = async (db, id) => {
  const collection = db.collection("accounts");
  const result = await collection.find({ _id: id }).toArray();
  return result;
};

const addAccount = async (db, account) => {
  const collection = db.collection("accounts");
  const result = await collection.insertOne(account);
  return result;
};

const deposit = async (db, id, amount) => {
  const collection = db.collection("accounts");
  const result = await collection.updateOne(
    { _id: id },
    { $inc: { balance: amount } }
  );
  return result;
};

const deleteAccount = async (db, id) => {
  const collection = db.collection("accounts");
  const result = await collection.deleteOne({ _id: id });
  return result;
};

module.exports.getAllAccounts = getAllAccounts;
module.exports.getAccount = getAccount;
module.exports.addAccount = addAccount;
module.exports.deposit = deposit;
module.exports.deleteAccount = deleteAccount;
