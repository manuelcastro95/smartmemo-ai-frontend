import React from 'react';
import AudioUpload from './AudioUpload';
import AudioTranscription from '../../../pages/AudioTranscription';

const MeetingDetail = ({ meeting, transcription, notes, onAudioUploaded }) => {


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Meeting Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold">{meeting.title}</h2>
        <p className="text-gray-600 mt-2">{meeting.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(meeting.scheduledTime).toLocaleString()}
        </p>
      </div>

      {/* Audio Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Audio de la Reunión</h3>
        {meeting.audioUrl ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <audio 
              controls 
              src={meeting.audioUrl}
              className="w-full"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
            <p className="text-sm text-gray-500 mt-2">
              URL del audio: {meeting.audioUrl}
            </p>
          </div>
        ) : (
          <AudioUpload 
            meetingId={meeting._id}
            onUploadComplete={(updatedMeeting) => {
              onAudioUploaded?.(updatedMeeting);
            }}
          />
        )}
      </div>

      {/* Transcription Section */}
      {meeting.audioUrl && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Transcripción</h3>
          <AudioTranscription 
            meetingId={meeting._id}
            transcription={transcription}
            onTranscriptionComplete={(newTranscription) => {
              console.log('New transcription:', newTranscription);
            }}
          />
        </div>
      )}

      {/* Notes Section */}
      {notes && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Notas y Resumen</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{notes.resumen}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetail; 