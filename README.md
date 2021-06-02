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
[
    {
        "_id": "60b79a7bc051077722d30b3d",
        "name": "Mary Bell",
        "balance": "450.55"
    },
    {
        "_id": "60b79ac0c051077722d30b3e",
        "name": "Tim Gogol",
        "balance": "67.34"
    },
    {
        "_id": "60b79ba84264f03b8fd8e7f2",
        "name": "Lilly Flower",
        "balance": "503432.11"
    }
]
```

| GET /accounts/:id |
| ----------------- |

Returns the specific account associated with a unique id

```
[
    {
        "_id": "60b79ba84264f03b8fd8e7f2",
        "name": "Lilly Flower",
        "balance": "503432.11"
    }
]
```

### POST

Creates a new bank account

| Param   | Description               |
| ------- | ------------------------- |
| name    | Account holder's name     |
| balance | Current amount on account |

| POST /accounts |
| -------------- |

```
{
    "success": true,
    "message": "new account saved",
    "status": 200,
    "data": {
        "name": "Tina Buj",
        "balance": "23432",
        "_id": "60b7aa4d2a1f9740289a9dff"
    }
}
```
