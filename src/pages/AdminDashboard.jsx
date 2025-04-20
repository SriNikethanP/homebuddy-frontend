import React, { useState, useEffect } from 'react';
import { format } from 'date-fns-tz';
import { bookingService } from '../services/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { authService } from '../services/auth';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [filters, setFilters] = useState({
        dateRange: 'all', // all, today, week, month
        status: 'all'
    });
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        fetchBookings();

        // Check if we're on mobile
        const checkMobile = () => {
            setMobileView(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [filters]);

    useEffect(() => {
        // Update selectAll state when all bookings are selected
        if (bookings.length > 0 && selectedBookings.length === bookings.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedBookings, bookings]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await bookingService.getAllBookings(filters);
            setBookings(response);
            setSelectedBookings([]); // Reset selections when filters change
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            await bookingService.updateBookingStatus(bookingId, newStatus);
            fetchBookings(); // Refresh the list
            toast.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const handleSelectBooking = (bookingId) => {
        setSelectedBookings(prev => {
            if (prev.includes(bookingId)) {
                return prev.filter(id => id !== bookingId);
            } else {
                return [...prev, bookingId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedBookings([]);
        } else {
            setSelectedBookings(bookings.map(booking => booking.id));
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteSelected = async () => {
        if (window.confirm(`Are you sure you want to delete ${selectedBookings.length} bookings?`)) {
            try {
                await bookingService.deleteBookings(selectedBookings);
                setSelectedBookings([]);
                setSelectAll(false);
                fetchBookings(); // Refresh the bookings list
                toast.success('Selected bookings deleted successfully');
            } catch (error) {
                toast.error('Failed to delete selected bookings');
            }
        }
    };

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/login';
    };

    const statusColors = {
        NOT_CALLED: 'bg-gray-100 text-gray-800',
        CALLED_PENDING: 'bg-yellow-100 text-yellow-800',
        CALL_AGAIN: 'bg-orange-100 text-orange-800',
        CONFIRMED: 'bg-green-100 text-green-800',
        COMPLETED: 'bg-blue-100 text-blue-800',
        CANCELLED: 'bg-red-100 text-red-800'
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-purple-600 hover:text-purple-800">
                            <i className="fas fa-arrow-left"></i>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <select
                            className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 w-full sm:w-auto"
                            value={filters.dateRange}
                            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>

                        <select
                            className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 w-full sm:w-auto"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="NOT_CALLED">Not Called</option>
                            <option value="CALLED_PENDING">Called - Pending</option>
                            <option value="CALL_AGAIN">Call Again</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {selectedBookings.length > 0 && (
                    <div className="bg-purple-100 p-4 rounded-lg mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <span className="text-purple-800 font-medium">
                            {selectedBookings.length} booking(s) selected
                        </span>
                        <button
                            onClick={handleDeleteSelected}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
                        >
                            Delete Selected
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8">
                        <i className="fas fa-spinner fa-spin text-3xl text-purple-600"></i>
                        <p className="mt-2 text-gray-600">Loading bookings...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {mobileView ? (
                            // Mobile view - card layout
                            <div className="divide-y divide-gray-200">
                                {bookings.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        No bookings found
                                    </div>
                                ) : (
                                    bookings.map((booking) => (
                                        <div key={booking.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBookings.includes(booking.id)}
                                                        onChange={() => handleSelectBooking(booking.id)}
                                                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{booking.name}</div>
                                                        <div className="text-sm text-gray-500">{booking.email}</div>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                                                    {booking.status.replace(/_/g, ' ')}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500 mb-2">
                                                <i className="fas fa-calendar-alt mr-1"></i>
                                                {format(new Date(booking.preferredDateTime), 'MMM d, yyyy h:mm a')}
                                            </div>
                                            <div className="text-sm text-gray-500 mb-2">
                                                <i className="fas fa-phone mr-1"></i>
                                                {booking.phone}
                                            </div>
                                            <div className="text-sm text-gray-500 mb-2">
                                                <i className="fas fa-tools mr-1"></i>
                                                {booking.service}
                                            </div>
                                            <div className="mt-2">
                                                <select
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                >
                                                    <option value="NOT_CALLED">Not Called</option>
                                                    <option value="CALLED_PENDING">Called - Pending</option>
                                                    <option value="CALL_AGAIN">Call Again</option>
                                                    <option value="CONFIRMED">Confirmed</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            // Desktop view - table layout
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                No bookings found
                                            </td>
                                        </tr>
                                    ) : (
                                        bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBookings.includes(booking.id)}
                                                        onChange={() => handleSelectBooking(booking.id)}
                                                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {format(new Date(booking.preferredDateTime), 'MMM d, yyyy h:mm a')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                                    <div className="text-sm text-gray-500">{booking.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {booking.phone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {booking.service}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                                                        {booking.status.replace(/_/g, ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <select
                                                        className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                                                        value={booking.status}
                                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                    >
                                                        <option value="NOT_CALLED">Not Called</option>
                                                        <option value="CALLED_PENDING">Called - Pending</option>
                                                        <option value="CALL_AGAIN">Call Again</option>
                                                        <option value="CONFIRMED">Confirmed</option>
                                                        <option value="COMPLETED">Completed</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 