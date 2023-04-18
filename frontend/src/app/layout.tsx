'use client';
import reportWebVitals from '../reportWebVitals';
import { SessionProvider } from 'next-auth/react';
import './styles/globals.css';
import './styles/VideoGrid.scss';

interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}

reportWebVitals();
