import React, { useState, useEffect } from 'react';
import { createMeeting, updateMeeting } from '../../../services/meetingService';
import MeetingForm from './MeetingForm';

const MeetingModal = ({ isOpen, onClose, meeting, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledTime: ''
  });

  useEffect(() => {
    if (meeting) {
      setFormData({
        title: meeting.title,
        description: meeting.description,
        scheduledTime: new Date(meeting.scheduledTime).toISOString().slice(0, 16)
      });
    } else {
      setFormData({
        title: '',
        description: '',
        scheduledTime: ''
      });
    }
  }, [meeting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (meeting) {
        await updateMeeting(meeting._id, formData);
      } else {
        await createMeeting(formData);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4">
            {meeting ? 'Editar Reunión' : 'Nueva Reunión'}
          </h2>
          <MeetingForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isEditing={!!meeting}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingModal; 