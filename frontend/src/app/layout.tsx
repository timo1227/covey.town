import reportWebVitals from '../reportWebVitals';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import './styles/globals.css';

export const metadata = {
  title: 'Covey Town',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: 'tss' }}>
          {children}
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}

reportWebVitals();
