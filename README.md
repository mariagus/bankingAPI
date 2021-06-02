# REST API Documentation

| Property | Description                                            |
| -------- | ------------------------------------------------------ |
| id       | The unique identifier by which to identify the service |
| name     | Name of the account holder                             |
| balance  | Current amount on account                              |

### GET

Returns a list of accounts held by the Bank

| GET /accounts |
| ------------- |

Returns all accounts held by the Bank

```
app.get("/accounts", (req, res) => {
  connectToDb(async (db) => {
    const collection = db.collection("accounts");
    const data = await collection.find({}).toArray();
    res.json(data);
  });
});
```

| GET /accounts/:id |
| ----------------- |

Returns the specific account associated with a unique id
