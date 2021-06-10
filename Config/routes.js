const AccountsController = require("../Controllers/AccountsController");

const routes = (app) => {
  app.get("/accounts", AccountsController.getAllAccounts);
  app.get("/accounts/:id", AccountsController.getAccount);
  app.post("/accounts", AccountsController.addAccount);
  app.put("/accounts/deposit", AccountsController.deposit);
  app.put("/accounts/withdraw", AccountsController.withdraw);
  app.put("/accounts/transfer", AccountsController.transfer);
  app.delete("/accounts/:id", AccountsController.deleteAccount);
};

module.exports = routes;
