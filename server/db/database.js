const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./data/expenses.db",
    (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Connected to SQLite");

            db.run(`
        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          
          category TEXT NOT NULL,
          date TEXT NOT NULL,
          note TEXT,
          userId INTEGER,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
            db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

            console.log("Expenses table ready");
        }
    }
);
db.all(
    "SELECT * FROM users",
    [],
    (err, rows) => {
        console.log(rows);
    }
);

module.exports = db;