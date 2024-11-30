import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Buffer } from 'buffer';
import { Readable } from 'stream-browserify';

window.Buffer = Buffer;
window.Readable = Readable;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
