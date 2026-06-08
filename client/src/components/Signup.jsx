import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";



function Signup({ setShowLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const handleSignup = async () => {

        try {

            await api.post(
                "/auth/signup",
                {
                    name,
                    email,
                    password
                }
            );

            toast.success(
                "Account Created Successfully!"
            );

            setShowLogin(true);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-8">

            <h2 className="text-2xl font-bold mb-4 text-center">
                Sign Up
            </h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                className="w-full border p-3 rounded mb-3"
            />

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
                onClick={handleSignup}
                className="w-full bg-green-600 text-white p-3 rounded"
            >
                Sign Up
            </button>

            <p className="text-center mt-4">
                Already have an account?
                <button
                    onClick={() =>
                        setShowLogin(true)
                    }
                    className="text-blue-600 ml-1"
                >
                    Login
                </button>
            </p>

        </div>
    );
}

export default Signup;