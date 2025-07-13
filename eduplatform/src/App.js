import React, { useState } from 'react';
import HomePage from './pages/HomePage';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div>
      <header>
        
      </header>
      {view === 'home' && <HomePage />}
    </div>
  );
}
