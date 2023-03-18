import React from 'react';
import AboutSection from '../components/LandingPage/aboutSection';
import HeroSection from '../components/LandingPage/heroSection';
import FeatureSection from '../components/LandingPage/featureSection';
import UpdateSection from '../components/LandingPage/updatesSection';

function CoveyTownSplash() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <UpdateSection />
      <AboutSection />
    </>
  );
}

export default CoveyTownSplash;
