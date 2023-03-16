import React, { useState } from 'react';
import './App.css';
import NavBar from './components/SplashPage/navbar';
import Footer from './components/SplashPage/footer';
import { Routes, Route, CompatRouter } from 'react-router-dom-v5-compat';
import CoveyTownSplash from './pages/Home';
import AppStateWrapper from './pages/Town';

export default function App() {
  const [hasJoinedTown, setHasJoinedTown] = useState(false);

  const handleJoinTown = () => {
    setHasJoinedTown(true);
  };

  const handleLeaveTown = () => {
    setHasJoinedTown(false);
  };

  return (
    <>
      <NavBar hasJoinedTown={hasJoinedTown} />
      <main className='w-full h-full flex flex-col border-8 border-blue-700'>
        <CompatRouter>
          <Routes>
            <Route path='/Home' element={<CoveyTownSplash />} />
            <Route
              path='/Town'
              element={
                <AppStateWrapper onJoinTown={handleJoinTown} onLeaveTown={handleLeaveTown} />
              }
            />
          </Routes>
        </CompatRouter>
      </main>
      <Footer />
    </>
  );
}
