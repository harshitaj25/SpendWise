const authMiddleware =
    require("../middleware/authMiddleware");

const db = require("../db/database");
const express = require("express");

const router = express.Router();


router.post("/",
    authMiddleware, (req, res) => {
        console.log("POST USER:", req.user);
        const { amount, category, date, note } = req.body;

        if (!amount || !category || !date) {

            return res.status(400).json({
                message: "Required fields missing"
            });

        }

        db.run(
            `
INSERT INTO expenses
(amount, category, date, note, userId)
VALUES (?, ?, ?, ?, ?)
  `,
            [
                amount,
                category,
                date,
                note,
                req.user.id
            ],
            function (err) {

                if (err) {

                    console.log("POST ERROR:", err);

                    return res.status(500).json({
                        message: err.message
                    });

                }

                res.status(201).json({
                    message: "Expense added successfully",
                    id: this.lastID
                });

            }
        );

    });
router.get("/summary",
    authMiddleware,
    (req, res) => {
        console.log("POST USER:", req.user);
        db.all(
            "   SELECT * FROM expenses WHERE userId = ?",
            [req.user.id],
            (err, rows) => {

                if (err) {

                    console.log("SUMMARY ERROR:", err);

                    return res.status(500).json({
                        message: err.message
                    });

                }

                const totalSpent = rows.reduce(
                    (sum, expense) => sum + expense.amount,
                    0
                );

                const highestExpense = Math.max(
                    ...rows.map(expense => expense.amount),
                    0
                );

                const categoryTotals = {};

                rows.forEach((expense) => {

                    if (!categoryTotals[expense.category]) {

                        categoryTotals[expense.category] = 0;

                    }

                    categoryTotals[expense.category] += expense.amount;

                });

                res.json({
                    totalSpent,
                    highestExpense,
                    categoryTotals
                });

            }
        );

    });
// router.get(
//     "/",
//     authMiddleware,
//     (req, res) => {
//         console.log(req.user);
//         const category = req.query.category;
//         const startDate = req.query.startDate;
//         const endDate = req.query.endDate;

//         let query = `
//     SELECT *
//     FROM expenses
//     WHERE userId = ?
// `;

//         let params = [req.user.id];

//         // let params = [];

//         if (category) {
//             if (startDate && endDate) {

//                 if (category) {

//                     query += `
//       AND date BETWEEN ? AND ?
//     `;

//                 } else {

//                     query += `
//       WHERE date BETWEEN ? AND ?
//     `;

//                 }

//                 params.push(startDate);
//                 params.push(endDate);

//             }

//             query += `
//       WHERE category = ?
//     `;

//             params.push(category);

//         }

//         query += `
//     ORDER BY date DESC
//   `;

//         db.all(
//             query,
//             params,
//             (err, rows) => {

//                 if (err) {

//                     return res.status(500).json({
//                         message: err.message
//                     });

//                 }

//                 res.json(rows);

//             }
//         );

//     });
router.get(
    "/",
    authMiddleware,
    (req, res) => {
        console.log("POST USER:", req.user);
        db.all(
            `
            SELECT *
            FROM expenses
            WHERE userId = ?
            ORDER BY date DESC
            `,
            [req.user.id],
            (err, rows) => {

                if (err) {

                    console.log("GET ERROR:", err);

                    return res.status(500).json({
                        message: err.message
                    });

                }

                res.json(rows);

            }
        );

    }
);

router.delete("/:id", authMiddleware, (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM expenses WHERE id = ? AND userId = ?",
        [id, req.user.id],
        function (err) {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            if (this.changes === 0) {

                return res.status(404).json({
                    message: "Expense not found"
                });

            }

            res.json({
                message: "Expense deleted successfully"
            });

        }
    );

});
router.put("/:id", authMiddleware, (req, res) => {

    const { id } = req.params;

    const { amount, category, date, note } = req.body;

    const sql = `
    UPDATE expenses
    SET amount = ?, category = ?, date = ?, note = ?
    WHERE id = ? AND userId = ?
`;

    db.run(
        sql,
        [
            amount,
            category,
            date,
            note,
            id,
            req.user.id
        ],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Expense updated successfully",
                changes: this.changes
            });

        }
    );

});




module.exports = router;