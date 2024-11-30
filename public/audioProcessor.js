class AudioProcessor extends AudioWorkletProcessor {
    
    constructor() {
      super();
      this.bufferSize = 2048;
      this.buffer = new Float32Array(this.bufferSize);
      this.bufferIndex = 0;
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      if (!input || !input[0]) return true;
  
      const inputData = input[0];
  
      // Llenar el buffer
      for (let i = 0; i < inputData.length; i++) {
        this.buffer[this.bufferIndex++] = inputData[i];
  
        if (this.bufferIndex >= this.bufferSize) {
          // Convertir a Int16
          const pcmData = new Int16Array(this.bufferSize);
          for (let j = 0; j < this.bufferSize; j++) {
            pcmData[j] = Math.max(-32768, Math.min(32767, this.buffer[j] * 32768));
          }
  
          // Enviar datos al thread principal
          this.port.postMessage(btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer))));
          
          // Reiniciar buffer
          this.bufferIndex = 0;
        }
      }
  
      return true;
    }
  }
  
  registerProcessor('audio-processor', AudioProcessor);