import React, { useState } from 'react';

const AudioTranscription = ({ meetingId, transcription, onTranscriptionComplete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleTranscription = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:5000/api/meetings/${meetingId}/transcribe`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Error al procesar la transcripción');
            }
            
            const data = await response.json();
            onTranscriptionComplete?.(data.transcription);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderTranscription = (transcription) => {
        return (
            <div className="space-y-4">
                <div className="mb-2">
                    <span className="font-semibold">Número de participantes:</span> {transcription.numberOfSpeakers}
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {transcription.conversation.map((entry, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded">
                            <div className="font-medium text-gray-700">
                                Participante: {entry.speakerId}
                            </div>
                            <div className="text-gray-600 mt-1">
                                {entry.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            {transcription ? (
                renderTranscription(transcription)
            ) : (
                <div className="text-center">
                    <button
                        onClick={handleTranscription}
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                        {isLoading ? 'Procesando...' : 'Iniciar Transcripción'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default AudioTranscription; 