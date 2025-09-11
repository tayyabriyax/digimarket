import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        alert("Login attempted (stubbed)!");
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full border px-4 py-2 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Password</label>
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full border px-4 py-2 rounded-lg pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
}

export default Login;
