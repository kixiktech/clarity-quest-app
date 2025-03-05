
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload the VT323 font to ensure it's available for the 404 page
const preloadFont = () => {
  // Create a link element for the font
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
  link.as = 'style';
  document.head.appendChild(link);
  
  // Create a style element to actually load the font
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
  document.head.appendChild(style);
};

// Preload font before rendering
preloadFont();

createRoot(document.getElementById("root")!).render(<App />);
