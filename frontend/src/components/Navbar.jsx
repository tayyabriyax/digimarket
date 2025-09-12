import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../lib/slices/authSlice";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.auth.IS_LOGGED_IN);

    return (
        <nav className="bg-white shadow-md fixed w-full">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    DigiMarket
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
                    {
                        isLoggedIn &&
                        <>
                            <Link to="/upload" className="hover:text-blue-600">Upload</Link>
                            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                        </>
                    }
                </div>

                {
                    !isLoggedIn ?
                        <div className="hidden md:flex space-x-4">
                            <Link to="/login" className="px-4 py-2 border rounded-lg hover:bg-blue-50">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Sign Up
                            </Link>
                        </div>
                        :
                        <div>
                            <button onClick={() => dispatch(logout())} className="px-4 py-2 border rounded-lg text-white bg-red-500 hover:bg-red-600">
                                Logout
                            </button>
                        </div>
                }

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/marketplace" onClick={() => setIsOpen(false)}>Marketplace</Link>
                        <Link to="/upload" onClick={() => setIsOpen(false)}>Upload</Link>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                        <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
