import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gray-900 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop view */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="text-sm hover:text-purple-400">
              <i className="fas fa-phone mr-2"></i>
              +91 9860222552
            </a>
            <a href="mailto:info@homebuddy.com" className="text-sm hover:text-purple-400">
              <i className="fas fa-envelope mr-2"></i>
              home.buddy6893@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="text-sm hover:text-purple-400">
              <i className="fas fa-headset mr-2"></i>
              Contact Us
            </Link>
            <Link to="/login" className="text-sm hover:text-purple-400">
              <i className="fas fa-user-shield mr-2"></i>
              Are you admin?
            </Link>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <Link to="/contact" className="text-sm hover:text-purple-400">
              <i className="fas fa-phone mr-2"></i>
              <span className="hidden sm:inline">+91 9860222552</span>
              <span className="sm:hidden">Contact Us</span>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="mt-2 py-2 space-y-2 border-t border-gray-700">
              <a href="mailto:ihome.buddy6893@gmail.com" className="block text-sm hover:text-purple-400">
                <i className="fas fa-envelope mr-2"></i>
                home.buddy6893@gmail.com
              </a>
              <a href="tel:+1234567890" className="block text-sm hover:text-purple-400">
                <i className="fas fa-phone mr-2"></i>
                Call Us: +91 9860222552
              </a>
              <Link to="/contact" className="block text-sm hover:text-purple-400">
                <i className="fas fa-headset mr-2"></i>
                Contact Us
              </Link>
              <Link to="/login" className="block text-sm hover:text-purple-400">
                <i className="fas fa-user-shield mr-2"></i>
                Are you admin?
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactBar; 