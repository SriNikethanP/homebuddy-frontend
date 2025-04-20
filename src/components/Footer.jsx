import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                        <Link to="/" className="text-xl sm:text-2xl font-bold text-purple-400">HomeBuddy</Link>
                        <p className="mt-2 text-sm sm:text-base text-gray-400">Proudly Serving Pune, Maharashtra</p>
                        <div className="mt-4">
                            <p className="text-sm sm:text-base text-gray-400">
                                Office: 123 Business Hub, Koregaon Park<br />
                                Pune, Maharashtra 411001
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">Home</Link></li>
                            <li><Link to="/services" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">Services</Link></li>
                            <li><Link to="/about" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">About</Link></li>
                            <li><Link to="/contact" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2">
                            <li className="text-sm sm:text-base text-gray-400 flex items-center gap-2">
                                <span>📞</span> +91 1234567890
                            </li>
                            <li className="text-sm sm:text-base text-gray-400 flex items-center gap-2">
                                <span>✉️</span> info@homebuddy.in
                            </li>
                            <li className="text-sm sm:text-base text-gray-400 flex items-center gap-2">
                                <span>⏰</span> Mon-Sat: 9 AM - 7 PM
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm sm:text-base text-gray-400">&copy; {new Date().getFullYear()} HomeBuddy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 