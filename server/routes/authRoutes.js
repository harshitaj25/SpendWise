const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/database");

const router = express.Router();
router.post("/signup", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        db.run(
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `,
            [
                name,
                email,
                hashedPassword
            ],
            function (err) {

                if (err) {

                    return res.status(400).json({
                        message:
                            "Email already exists"
                    });

                }

                res.json({
                    message:
                        "User created successfully"
                });

            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }


});
router.post("/login", (req, res) => {

    const { email, password } = req.body;
    console.log("LOGIN EMAIL:", email);

    db.get(
        `
        SELECT * FROM users
        WHERE email = ?
        `,
        [email],
        async (err, user) => {

            console.log("USER FOUND:", user);
            if (err) {

                return res.status(500).json({
                    message: "Server Error"
                });

            }

            if (!user) {

                return res.status(400).json({
                    message: "User not found"
                });

            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(400).json({
                    message:
                        "Invalid password"
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                "mySecretKey",
                {
                    expiresIn: "7d"
                }
            );

            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        }
    );

});

module.exports = router;