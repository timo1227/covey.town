import { FiLock, FiMonitor } from 'react-icons/fi';
import { RxSpeakerLoud } from 'react-icons/rx';

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

export default function AboutSection() {
  const cards = [
    {
      icon: 'FiMonitor',
      title: 'Virtual',
      description:
        'Covey.town is a virtual event platform designed to create an immersive and collaborative environment for remote teams, communities, and organizations.',
    },
    {
      icon: 'RxSpeakerLoud',
      title: 'Audio',
      description:
        'Our platform uses advanced technology, including spatial audio and customizable virtual rooms, to provide a unique and engaging experience for participants.',
    },
    {
      icon: 'FiLock',
      title: 'Privacy',
      description:
        'Covey.town is committed to protecting your privacy. We do not collect any personal information and all data is encrypted and stored securely.',
    },
  ];

  function aboutCards({ icon, title, description }: CardProps) {
    return (
      <div
        key={title}
        className='max-w-sm rounded-md overflow-hidden shadow-lg border-gray-700 border bg-gray-700 bg-opacity-25 backdrop-blur-sm pb-5 flex-1'>
        <div className='header flex items-center gap-2 px-3 mt-5'>
          {icon === 'FiMonitor' && <FiMonitor className='text-indigo-500 sm:text-l text-md' />}
          {icon === 'RxSpeakerLoud' && (
            <RxSpeakerLoud className='text-indigo-500 sm:text-l text-md' />
          )}
          {icon === 'FiLock' && <FiLock className='text-indigo-500 sm:text-l text-md' />}
          <p className='text-l text-white'>{title}</p>
        </div>
        <div>
          <p className='text-white px-9 py-3'>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div id='About' className='relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32'>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]'>
        <path
          fill='url(#10724532-9d81-43d2-bb94-866e98dd6e42)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='10724532-9d81-43d2-bb94-866e98dd6e42'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu'>
        <path
          fill='url(#8ddc7edb-8983-4cd7-bccb-79ad21097d70)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='8ddc7edb-8983-4cd7-bccb-79ad21097d70'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>About Us</h2>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            Covey.town is a virtual event platform that provides a unique and immersive experience
            for online gatherings, meetings, and events. It is designed to create an interactive and
            collaborative environment for participants, providing a sense of being in the same
            physical space despite being remote.
          </p>
        </div>
        <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none grid grid-flow-row sm:grid-flow-col justify-center py-2 gap-5'>
          {cards.map(card => aboutCards(card))}
        </div>
      </div>
    </div>
  );
}
