import LoginForm from '../../components/UserLogin/loginForm';
import NavBar from '../../components/LandingPage/navBar';

export const metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <>
      <NavBar />
      {/* @ts-expect-error Server Component */}
      <LoginForm />
    </>
  );
}
