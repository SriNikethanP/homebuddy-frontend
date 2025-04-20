import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-[400px] sm:h-[500px] bg-gradient-to-r from-purple-600 to-purple-800">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-12 sm:py-0">
        <div className="text-white w-full">
          <div className="bg-purple-100 text-purple-700 py-1 px-4 rounded-full inline-block mb-4 text-sm font-medium">
            📍 Currently serving in Pune, Maharashtra
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Home Painting & Interior Services in <span className="text-purple-100">Pune, Maharashtra</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl">
            Serving homes across Pune with expert care and quality craftsmanship
          </p>
          <Link
            to="/book-appointment"
            className="inline-block bg-white text-purple-600 px-6 sm:px-12 py-3 sm:py-4 rounded-lg text-xl sm:text-2xl font-bold hover:bg-gray-100 transform transition-transform hover:scale-105 shadow-lg text-center"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 