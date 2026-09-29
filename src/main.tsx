import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TrackerProvider } from './state/TrackerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TrackerProvider>
      <App />
    </TrackerProvider>
  </React.StrictMode>,
);
