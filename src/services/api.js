import axios from 'axios';

// Safely get the API URL with a fallback
const API_BASE_URL = process.env.VITE_API_URL || 'https://homebuddy-backend-1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getAllBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  updateBookingStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}/status?status=${status}`);
    return response.data;
  },
  deleteBookings: async (bookingIds) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bookings/bulk`, {
        data: { ids: bookingIds }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting bookings:', error);
      throw error;
    }
  },
};

export const messageService = {
  createMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
  getAllMessages: async () => {
    const response = await api.get('/messages');
    return response.data;
  },
  getMessageById: async (id) => {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.put(`/messages/${id}/read`);
    return response.data;
  },
}; 