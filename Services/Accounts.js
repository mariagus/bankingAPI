const getAllAccounts = async (db) => {
  const collection = db.collection("accounts");
  const result = await collection.find({}).toArray();
  return result;
};

const addAccount = async (db, account) => {
  const collection = db.collection("accounts");
  const result = await collection.insertOne(account);
  return result;
};

const deleteAccount = async (db, id) => {
  const collection = db.collection("accounts");
  const result = await collection.deleteOne({ _id: id });
  return result;
};

module.exports.getAllAccounts = getAllAccounts;
module.exports.addAccount = addAccount;
module.exports.deleteAccount = deleteAccount;
