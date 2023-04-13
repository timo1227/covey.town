import Nav from '../../components/LandingPage/navBar';
import AppStateWrapper from '../../components/Town/Town';

export const metadata = {
  title: 'Join Town',
};

export default function Town() {
  return (
    <>
      <Nav />
      <AppStateWrapper />
    </>
  );
}
