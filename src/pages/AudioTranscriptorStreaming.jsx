import React, { useState, useEffect, useRef } from 'react';

const AudioTranscriptorStreaming = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Inicializar WebSocket
    wsRef.current = new WebSocket('ws://localhost:5000');

    wsRef.current.onmessage = (evento) => {
      try {
        const respuesta = JSON.parse(evento.data);
        if (respuesta.tipo === 'transcripcion') {
          setTranscription(prev => prev + ' ' + respuesta.texto);
        }
      } catch (error) {
        console.error('Error al procesar mensaje:', error);
      }
    };

    return () => {
      stopRecording();
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = async (evento) => {
        const audioBlob = evento.data;
        const arrayBuffer = await audioBlob.arrayBuffer();
        const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

        // Enviar al WebSocket si está conectado
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            tipo: 'audio_data',
            audio: base64Audio
          }));
        }
      };

      mediaRecorderRef.current.start(100); // Captura datos cada 100 ms
      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-transcriptor">
      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording} className="start-button">
            Iniciar Grabación
          </button>
        ) : (
          <button onClick={stopRecording} className="stop-button">
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

export default AudioTranscriptorStreaming;
