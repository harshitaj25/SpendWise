const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
require("./db/database");
const expenseRoutes = require("./routes/expenseRoutes");
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
    res.send("Expense Tracker API Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});