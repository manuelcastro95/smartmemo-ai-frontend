import React, { useEffect, useState } from 'react';
import { getMeetings } from '../../services/meetingService';
import MeetingList from './components/MeetingList';
import MeetingModal from './components/MeetingModal';
import MeetingDetail from './components/MeetingDetail';

const MeetingPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const meetingsData = await getMeetings();
      setMeetings(meetingsData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetail = async (meeting) => {
    setSelectedMeeting(meeting);
    try {
      // TODO: Implement these service functions
      const transcriptionData = await getTranscriptionByMeetingId(meeting._id);
      if (transcriptionData && transcriptionData.id) {
        const notesData = await getNotesByTranscriptionId(transcriptionData.id);
        setTranscription(transcriptionData);
        setNotes(notesData);
      } else {
        console.warn('No transcription data found for the selected meeting.');
      }
      console.log('transcriptionData', transcriptionData);
      // console.log('notesData', notesData);
    } catch (error) {
      console.error('Error fetching meeting details:', error);
    }
  };

  const getTranscriptionByMeetingId = async (meetingId) => {
    const response = await fetch(`http://localhost:5000/api/meetings/${meetingId}/conversation`);
    return response.json();
  };

  const getNotesByTranscriptionId = async (transcriptionId) => {
    const response = await fetch(`http://localhost:5000/api/transcription/${transcriptionId}/notes`);
    return response.json();
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Tus Reuniones</h2>
          <button
            onClick={() => {
              setCurrentMeeting(null);
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Nueva Reunión
          </button>
        </div>

        {selectedMeeting ? (
          <div className="mb-4">
            <button
              onClick={() => setSelectedMeeting(null)}
              className="mb-4 text-primary-600 hover:text-primary-700"
            >
              ← Volver a la lista
            </button>
            <MeetingDetail
              meeting={selectedMeeting}
              transcription={transcription}
              notes={notes}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MeetingList
              meetings={meetings}
              onEdit={(meeting) => {
                setCurrentMeeting(meeting);
                setIsModalOpen(true);
              }}
              onRefresh={fetchMeetings}
              onViewDetail={handleViewDetail}
            />
          </div>
        )}
      </div>

      <MeetingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentMeeting(null);
        }}
        meeting={currentMeeting}
        onSuccess={() => {
          fetchMeetings();
          setIsModalOpen(false);
          setCurrentMeeting(null);
        }}
      />
    </div>
  );
};

export default MeetingPage; 