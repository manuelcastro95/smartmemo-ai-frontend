import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getMeetings = async () => {
  try {
    const response = await axios.get(`${API_URL}/meetings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMeetingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createMeeting = async (meetingData) => {
  try {
    const response = await axios.post(`${API_URL}/meetings`, meetingData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateMeeting = async (id, meetingData) => {
  try {
    const response = await axios.put(`${API_URL}/meetings/${id}`, meetingData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteMeeting = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
