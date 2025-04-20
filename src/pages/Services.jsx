import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, image }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to="/book-appointment"
        className="inline-flex items-center text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Book Service
        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
);

const Services = () => {
  const services = [
    {
      title: 'Home Painting',
      description: 'Transform your space with our professional home painting services. We offer interior and exterior painting solutions.',
      image: '/images/services/painting.jpg'
    },
    {
      title: 'Waterproofing',
      description: 'Protect your home from water damage with our comprehensive waterproofing solutions.',
      image: '/images/services/waterproofing.jpg'
    },
    {
      title: 'Wallpaper Installation',
      description: 'Add style and personality to your walls with our premium wallpaper installation service.',
      image: '/images/services/wallpaper.jpg'
    },
    {
      title: 'False Ceiling',
      description: "Enhance your room's aesthetics and functionality with our custom false ceiling solutions.",
      image: '/images/services/ceiling.jpg'
    },
    {
      title: 'Electrical Work',
      description: 'Professional electrical services for all your home improvement needs.',
      image: '/images/services/electrical.jpg'
    },
    {
      title: 'Trims Design',
      description: 'Add elegant finishing touches to your home with our custom trim design services.',
      image: '/images/services/trims.jpg'
    },
    {
      title: 'Deep Cleaning',
      description: 'Comprehensive deep cleaning services to keep your home fresh and hygienic.',
      image: '/images/services/cleaning.jpg'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">
            Professional home improvement services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services; 