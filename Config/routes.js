const AccountsController = require("../Controllers/AccountsController");

const routes = (app) => {
  app.get("/accounts", AccountsController.getAllAccounts);
  app.post("/accounts", AccountsController.addAccount);
  app.delete("/accounts/:id", AccountsController.deleteAccount);
};

module.exports = routes;
