import React, { useState, useEffect, useRef } from 'react';

const AudioTranscriptor = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Inicializar WebSocket
    wsRef.current = new WebSocket('ws://tu-servidor:3000');

    wsRef.current.onmessage = (evento) => {
      const respuesta = JSON.parse(evento.data);
      if (respuesta.tipo === 'transcripcion') {
        setTranscription(prev => prev + ' ' + respuesta.datos.texto);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = async (evento) => {
        const audioBlob = evento.data;
        const buffer = await audioBlob.arrayBuffer();
        const base64Audio = btoa(
          String.fromCharCode(...new Uint8Array(buffer))
        );

        wsRef.current.send(JSON.stringify({
          tipo: 'audio_data',
          audio: base64Audio
        }));
      };

      mediaRecorderRef.current.start(100);
      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-transcriptor">
      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording}>
            Iniciar Grabación
          </button>
        ) : (
          <button onClick={stopRecording}>
            Detener Grabación
          </button>
        )}
      </div>
      
      <div className="transcription">
        <h3>Transcripción en tiempo real:</h3>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioTranscriptor; 