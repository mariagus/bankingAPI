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

const withdraw = async (db, id, amount) => {
  const collection = db.collection("accounts");
  const result = await collection.updateOne(
    { _id: id },
    { $inc: { balance: -amount } }
  );
  return result;
};

const transfer = async (db, amount, id1, id2) => {
  const collection = db.collection("accounts");
  const data = await collection.find({ _id: id1 }).toArray();
  if (data[0].balance < amount) {
    return data;
  }
  const result1 = await collection.updateOne(
    { _id: id1 },
    { $inc: { balance: -amount } }
  );
  if (result1.modifiedCount === 1) {
    const result2 = await collection.updateOne(
      { _id: id2 },
      { $inc: { balance: amount } }
    );
    return result2;
  }
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
module.exports.withdraw = withdraw;
module.exports.transfer = transfer;
module.exports.deleteAccount = deleteAccount;
