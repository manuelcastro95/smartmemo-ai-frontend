import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-4">
            <div className="w-full max-w-md">
                {/* Logo y Título Principal */}
                <div className="text-center mb-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-2xl mb-2 p-3">
                        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <p className="text-primary-600 mb-2">Accede a tu cuenta para comenzar</p>
                </div>

                {/* Card de Login - Agregado el degradado aquí */}
                <div className="backdrop-blur-sm bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-2xl shadow-2xl p-6 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            <div>
                                <label className="block text-white text-sm font-medium mb-1">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-white/20 rounded-xl 
                                                 bg-white/10 text-white placeholder-white/60
                                                 focus:outline-none focus:ring-2 focus:ring-white/50
                                                 backdrop-blur-sm transition-all duration-200"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1">Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-white/20 rounded-xl 
                                                 bg-white/10 text-white placeholder-white/60
                                                 focus:outline-none focus:ring-2 focus:ring-white/50
                                                 backdrop-blur-sm transition-all duration-200"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm py-2">
                            <label className="flex items-center text-white/80">
                                <input type="checkbox" className="rounded border-white/20 text-primary-600 focus:ring-primary-500 bg-white/10 mr-2" />
                                Recordarme
                            </label>
                            <Link to="/forgot-password" className="text-white hover:text-white/80 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-xl text-white font-medium
                                     bg-white/20 hover:bg-white/30 
                                     transform transition-all duration-200 
                                     hover:scale-[1.02] active:scale-[0.98]
                                     focus:outline-none focus:ring-2 focus:ring-white/50
                                     shadow-lg hover:shadow-xl"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <p className="mt-4 text-center text-white/80 text-sm">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="text-white font-medium hover:text-white/90 transition-colors">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
