import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`px-4 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                {children}
            </Link>
        );
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold text-primary-600">
                            SmartMemo AI
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {user && (
                        <div className="hidden md:flex space-x-4">
                            <NavLink to="/dashboard">Panel</NavLink>
                            <NavLink to="/meetings">Reuniones</NavLink>
                            {/* <NavLink to="/transcription">Transcripción</NavLink> */}
                        </div>
                    )}

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="hidden md:block text-sm text-gray-600">
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="btn btn-danger text-sm px-3 py-1"
                                >
                                    Salir
                                </button>
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                {user && isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-2">
                            <NavLink to="/dashboard">Panel</NavLink>
                            <NavLink to="/meetings">Reuniones</NavLink>
                            {/* <NavLink to="/transcription">Transcripción</NavLink> */}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 