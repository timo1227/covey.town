import reportWebVitals from '../reportWebVitals';
import './styles/globals.css';

export const metadata = {
  title: 'Covey Town',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

reportWebVitals();
