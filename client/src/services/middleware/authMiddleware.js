const jwt = require("jsonwebtoken");

const authMiddleware = (
    req,
    res,
    next
) => {

    const token =
        req.headers.authorization;

    if (!token) {

        return res.status(401).json({
            message: "No Token"
        });

    }

    try {

        const decoded =
            jwt.verify(
                token,
                "mySecretKey"
            );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message:
                "Invalid Token"
        });

    }

};

module.exports =
    authMiddleware;