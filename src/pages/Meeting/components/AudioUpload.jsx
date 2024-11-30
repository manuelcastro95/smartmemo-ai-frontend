import React, { useState } from 'react';

const AudioUpload = ({ meetingId, onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const handleFileChange = (event) => {
        const audioFile = event.target.files[0];
        setFile(audioFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !meetingId) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('audio', file);
        formData.append('meetingId', meetingId);

        try {
            const response = await fetch('http://localhost:5000/api/meetings/upload-audio-s3', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            onUploadComplete?.(data);
            setFile(null);
        } catch (error) {
            console.error('Error al subir el audio:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Subir Audio de la Reunión
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                                </p>
                                <p className="text-xs text-gray-500">Solo archivos de audio</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="audio/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    {file && (
                        <p className="text-sm text-gray-600">
                            Archivo seleccionado: {file.name}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!file || loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                        ${!file || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11V21h-5v-5h5m-11-11h5v5m-11 0z" />
                            </svg>
                            Subiendo...
                        </span>
                    ) : 'Subir Audio'}
                </button>
            </form>
        </div>
    );
};

export default AudioUpload; 