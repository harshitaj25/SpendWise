import { useState } from "react";
import api from "../services/api";


function Login({
    setIsLoggedIn,
    setShowLogin
}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        console.log("LOGIN BUTTON CLICKED");
        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            setIsLoggedIn(true);

            alert("Login Successful!");

            console.log(
                "TOKEN:",
                response.data.token
            );

        } catch (error) {
            console.log(error.response);
            console.log(error.message);

        }

    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-8">

            <h2 className="text-2xl font-bold mb-4 text-center">
                Login
            </h2>
            <p className="text-center mt-4">

                Don't have an account?

                <button
                    onClick={() =>
                        setShowLogin(false)
                    }
                    className="text-blue-600 ml-1"
                >
                    Sign Up
                </button>

            </p>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                className="w-full border p-3 rounded mb-3"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="w-full border p-3 rounded mb-3"
            />
            <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white p-3 rounded"
            >
                Login
            </button>

        </div>
    );
}

export default Login;