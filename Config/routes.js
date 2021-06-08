const AccountsController = require("../Controllers/AccountsController");

const routes = (app) => {
  app.get("/accounts", AccountsController.getAllAccounts);
  app.get("/accounts/:id", AccountsController.getAccount);
  app.post("/accounts", AccountsController.addAccount);
  app.put("/accounts/deposit/:id", AccountsController.deposit);
  // app.put("/accounts/withdraw/:id", AccountsController.withdraw);
  // app.put("/accounts/transfer/:id1/:id2", AccountsController.transfer);
  app.delete("/accounts/:id", AccountsController.deleteAccount);
};

module.exports = routes;
