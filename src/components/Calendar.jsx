import React, { useState } from 'react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateDates = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const dates = [];

    // Add empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }

    // Add all dates in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      date.setHours(0, 0, 0, 0); // Normalize time
      dates.push(date);
    }

    return dates;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    const normalizedSelected = new Date(selectedDate);
    normalizedSelected.setHours(0, 0, 0, 0);
    return date.getTime() === normalizedSelected.getTime();
  };

  const handleDateSelect = (date) => {
    if (date && !isDateDisabled(date)) {
      onDateSelect(date); // Pass the full Date object
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="button"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="button"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-2">
        {generateDates().map((date, index) => {
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              disabled={disabled}
              className={`
                h-12 rounded-lg text-sm font-medium transition-colors duration-200
                ${!date ? 'invisible' : ''}
                ${disabled ? 'text-gray-300 cursor-not-allowed bg-gray-50' : ''}
                ${!disabled && selected ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}
                ${!disabled && !selected ? 'bg-white text-gray-700 hover:bg-purple-50 active:bg-purple-100' : ''}
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}
              type="button"
            >
              {date?.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
