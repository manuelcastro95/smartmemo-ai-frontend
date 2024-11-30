import React from 'react';
import { deleteMeeting } from '../../../services/meetingService';

const MeetingItem = ({ meeting, onEdit, onRefresh, onViewDetail }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reunión?')) {
      try {
        await deleteMeeting(meeting._id);
        onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold">{meeting.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{meeting.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(meeting.scheduledTime).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
          <button
            onClick={() => onEdit(meeting)}
            className="flex-1 sm:flex-none px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={() => onViewDetail(meeting)}
            className="flex-1 sm:flex-none px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ver Detalle
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 sm:flex-none px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingItem; 