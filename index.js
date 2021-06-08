const express = require("express");
const routes = require("./Config/routes");

const app = express();
app.use(express.json());
routes(app);

module.exports = app;

// //deposit to account
// app.put("/accounts/:id/deposit", (req, res) => {
//   const idToFind = ObjectId(req.params.id);
//   const amount = req.body.amount;

//   connectToDb(async (db) => {
//     const collection = db.collection("accounts");
//     const result = await collection.updateOne(
//       { _id: idToFind },
//       { $inc: { balance: round(amount, 2) } }
//     );
//     if (result.modifiedCount === 1) {
//       return res.send("done");
//     } else {
//       return res.send("fail");
//     }
//   });
// });
// //withdraw from account
// app.put("/accounts/:id/withdraw", (req, res) => {
//   const idToFind = ObjectId(req.params.id);
//   const amount = req.body.amount;

//   connectToDb(async (db) => {
//     const collection = db.collection("accounts");
//     const result = await collection.updateOne(
//       { _id: idToFind },
//       { $inc: { balance: round(-amount, 2) } }
//     );
//     if (result.modifiedCount === 1) {
//       return res.send("done");
//     } else {
//       return res.send("fail");
//     }
//   });
// });

// app.put("/accounts/transfer/:id1/:id2", (req, res) => {
//   const idAcctOrigin = ObjectId(req.params.id1);
//   const idAcctDestination = ObjectId(req.params.id2);
//   const amount = req.body.amount;

//   if (!req.body.amount || typeof req.body.amount !== "number") {
//     return res.send({
//       success: false,
//       message: "transfer failed",
//       status: 400,
//     });
//   }

//   connectToDb(async (db) => {
//     const collection = db.collection("accounts");
//     const balance = await collection.find({ _id: idAcctOrigin }).toArray();
//     if (balance[0].balance < amount) {
//       return res.send({
//         success: false,
//         message: "insufficient funds",
//       });
//     }
//     const result1 = await collection.updateOne(
//       { _id: idAcctOrigin },
//       { $inc: { balance: round(-amount, 2) } }
//     );
//     if (result1.modifiedCount === 1) {
//       const result2 = await collection.updateOne(
//         { _id: idAcctDestination },
//         { $inc: { balance: round(amount, 2) } }
//       );
//       if (result2.modifiedCount === 1) {
//         return res.send({
//           success: true,
//           message: "transfer succeeded",
//           status: 200,
//         });
//       }
//     } else {
//       return res.send({
//         success: false,
//         message: "transfer failed",
//         status: 400,
//       });
//     }
//   });
// });

// //delete account
// app.delete("/accounts/:id", (req, res) => {
//   const idToDelete = ObjectId(req.params.id);

//   connectToDb(async (db) => {
//     const collection = db.collection("accounts");
//     const result = await collection.deleteOne({
//       _id: idToDelete,
//     });
//     return res.send("deleted");
//   });
// });

// app.listen(port);
