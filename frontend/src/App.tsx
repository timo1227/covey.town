import React from 'react';
import './App.css';
import { Routes, Route, CompatRouter } from 'react-router-dom-v5-compat';
import CoveyTownSplash from './pages/Home';
import AppStateWrapper from './pages/Town';

export default function App() {
  return (
    <>
      <main className='w-full'>
        <CompatRouter>
          <Routes>
            <Route path='/' element={<CoveyTownSplash />} />
            <Route path='/Town' element={<AppStateWrapper />} />
          </Routes>
        </CompatRouter>
      </main>
    </>
  );
}
