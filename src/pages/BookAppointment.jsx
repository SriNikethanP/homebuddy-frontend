import React, { useState } from 'react';
import Calendar from '../components/Calendar';

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    address: ''
  });
  const [touched, setTouched] = useState({
    service: false,
    name: false,
    phone: false,
    address: false
  });

  // Generate time slots from 9 AM to 8 PM (12 slots)
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM'
  ];

  const services = [
    'Home Painting',
    'Waterproofing',
    'Wallpaper Installation',
    'False Ceiling',
    'Electrical Work',
    'Trims Design',
    'Deep Cleaning'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'phone':
        return value.trim() === '' 
          ? 'Phone number is required' 
          : !/^\d{10}$/.test(value.trim()) 
            ? 'Please enter a valid 10-digit phone number'
            : '';
      case 'address':
        return value.trim() === '' ? 'Address is required' : '';
      case 'service':
        return value === '' ? 'Please select a service' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, field === 'service' ? selectedService : formData[field])
    }));
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedService(value);
    setErrors(prev => ({
      ...prev,
      service: validateField('service', value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      service: validateField('service', selectedService),
      date: !selectedDate ? 'Please select a date' : '',
      time: !selectedTime ? 'Please select a time slot' : '',
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      address: validateField('address', formData.address)
    };

    setErrors(newErrors);
    setTouched({
      service: true,
      name: true,
      phone: true,
      address: true
    });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Handle form submission
    console.log({
      ...formData,
      selectedDate,
      selectedTime,
      selectedService
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
          <p className="text-xl text-gray-600">Schedule a consultation with our experts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Calendar and Time Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              {errors.date && !selectedDate && (
                <p className="text-red-500 text-sm mt-2 px-6 pb-4">{errors.date}</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Time Slot</h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 text-sm rounded-lg border transition-colors duration-200
                      ${selectedTime === time
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50'
                      }
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {errors.time && !selectedTime && (
                <p className="text-red-500 text-sm mt-2">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Booking Details Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service*
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={handleServiceChange}
                  onBlur={() => handleBlur('service')}
                  className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                    touched.service && errors.service ? 'border-red-500' : ''
                  }`}
                  required
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {touched.service && errors.service && (
                  <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('name')}
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                      touched.name && errors.name ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('phone')}
                    className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                      touched.phone && errors.phone ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('address')}
                  rows={3}
                  className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                    touched.address && errors.address ? 'border-red-500' : ''
                  }`}
                  required
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment; 