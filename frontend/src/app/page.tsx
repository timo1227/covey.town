import AboutSection from '../components/LandingPage/aboutSection';
import FeatureSection from '../components/LandingPage/featureSection';
import HeroSection from '../components/LandingPage/heroSection';
import UpdateSection from '../components/LandingPage/updatesSection';

export const metadata = {
  title: 'Covey.Town',
};

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
