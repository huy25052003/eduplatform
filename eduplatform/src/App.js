import React, { useState } from 'react';
import HomePage from './pages/HomePage';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div>
      <header>
        <h1>Sàn giáo dục</h1>
        <nav>
          <button onClick={() => setView('home')}>Trang chủ</button>
        </nav>
      </header>
      {view === 'home' && <HomePage />}
    </div>
  );
}
