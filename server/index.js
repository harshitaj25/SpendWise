const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./db/database");

const authRoutes =
    require("./routes/authRoutes");

const expenseRoutes =
    require("./routes/expenseRoutes");

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/expenses",
    expenseRoutes
);

app.get("/", (req, res) => {
    res.send("Expense Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});