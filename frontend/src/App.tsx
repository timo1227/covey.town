import React from 'react';
import './App.css';
import { Routes, Route, CompatRouter } from 'react-router-dom-v5-compat';
import CoveyTownSplash from './pages/Home';
import AppStateWrapper from './pages/Town';
import Register from './pages/Register';
import Login from './pages/Login';

export default function App() {
  return (
    <>
      <CompatRouter>
        <Routes>
          <Route path='/' element={<CoveyTownSplash />} />
          <Route path='/Town' element={<AppStateWrapper />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </CompatRouter>
    </>
  );
}
