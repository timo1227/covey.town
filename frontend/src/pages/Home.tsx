import React from 'react';
import Image1 from '../public/SplashImage.png';

interface ContentSectionProps {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
}

function CoveyTownSplash() {
  function ContentSection({ children, styles, className }: ContentSectionProps) {
    return (
      <section
        className={`flex md:flex-row justify-center items-center border-2 border-purple-600 p-5 ${className}`}
        style={styles}>
        {children}
      </section>
    );
  }

  function Header() {
    return <h1 className='text-3xl font-bold text-center p-10'>Welcome to Covey Town!</h1>;
  }

  return (
    <div className='mt-5 border-4 border-pink-500'>
      <Header />
      <div className='w-full text-xl py-5 flex flex-col border-4 border-orange-500' id='content'>
        <ContentSection className='flex-col'>
          <div className='container flex flex-col justify-center items-center'>
            <h2 className='font-bold text-2xl text-center'>
              A better way for your remote team to work together. <br /> Create a Covey Town Today!
            </h2>
            <a className='pt-10' href='/Town'>
              <button className='bg-blue-600 text-white py-1 px-5 text-center rounded-xl shadow-2xl font-bold hover:bg-slate-400 hover:text-black'>
                Join Now
              </button>
            </a>
          </div>
          <div className='container rounded-2xl overflow-hidden shadow-lg max-w-screen-md'>
            <img src={Image1} alt='Covey Town' />
          </div>
        </ContentSection>
        <ContentSection className='flex-row flex-wrap'>
          <h2 className='font-bold text-2xl text-center'>What is Covey Town?</h2>
          <p className='text-center'>
            Covey Town is a virtual town where you and your team can meet and work together. Create
            your own Covey Town and invite your team to join. You can use Covey Town to chat, share
            files, and even play games together.
          </p>
        </ContentSection>
      </div>
    </div>
  );
}

export default CoveyTownSplash;
