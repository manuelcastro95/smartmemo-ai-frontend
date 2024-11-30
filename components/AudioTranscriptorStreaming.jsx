import React, { useState, useEffect, useRef } from 'react';
import MicrophoneStream from 'microphone-stream';

const AudioTranscriptorStreaming = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const micStreamRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Inicializar WebSocket
    wsRef.current = new WebSocket('ws://tu-servidor:3000');

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
      
      // Crear nueva instancia de MicrophoneStream
      micStreamRef.current = new MicrophoneStream();
      micStreamRef.current.setStream(stream);

      // Configurar el procesamiento del stream
      micStreamRef.current.on('data', (chunk) => {
        // Convertir el chunk a Base64
        const raw = MicrophoneStream.toRaw(chunk); // convierte a raw PCM si es necesario
        if (raw) {
          const base64Audio = Buffer.from(raw).toString('base64');

          // Enviar al WebSocket si está conectado
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
              tipo: 'audio_data',
              audio: base64Audio
            }));
          }
        }
      });

      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    if (micStreamRef.current) {
      micStreamRef.current.stop();
      micStreamRef.current = null;
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-transcriptor">
      <div className="controls">
        {!isRecording ? (
          <button 
            onClick={startRecording}
            className="start-button"
          >
            Iniciar Grabación
          </button>
        ) : (
          <button 
            onClick={stopRecording}
            className="stop-button"
          >
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
