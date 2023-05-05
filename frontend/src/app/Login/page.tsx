import LoginForm from '../../components/User/loginForm';
import NavBar from '../../components/LandingPage/navBar';

export const metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
}
