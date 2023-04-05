export default function FeatureSection() {
  return (
    <div
      id='Features'
      className='relative isolate overflow-hidden w-full sm:h-[calc(100vh-20rem)] bg-gray-900 py-24 sm:py-24'>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='hidden transform-gpu blur-3xl sm:absolute sm:top-60 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]'>
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
      <div className='flex flex-col items-center px-4 mx-auto text-center mb-5 sm:mb-0'>
        <h2 className='text-5xl font-bold tracking-tight sm:text-6xl text-white text-center mb-10'>
          Features
        </h2>
        <p className='max-w-xl text-xl text-white'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas necessitatibus
          voluptates. Quisquam, ex ratione.
        </p>
      </div>
      <div className='flex flex-col items-center justify-center w-full h-full max-w-6xl px-4 pb-28 mx-auto space-y-8 text-center'>
        <div className='flex flex-wrap items-center justify-center w-full max-w-4xl space-y-8 md:space-y-0 '>
          <div className='flex flex-col items-center justify-center w-full max-w-sm space-y-4'>
            <div className='flex items-center justify-center w-16 h-16 text-white bg-blue-500 rounded-full'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-white'>Feature One</h3>
            <p className='text-base text-white'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas
              necessitatibus voluptates. Quisquam, ex ratione.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center w-full max-w-sm space-y-4'>
            <div className='flex items-center justify-center w-16 h-16 text-white bg-blue-500 rounded-full'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-white'>Feature Two</h3>
            <p className='text-base text-white'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas
              necessitatibus voluptates. Quisquam, ex ratione.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center w-full max-w-sm space-y-4'>
            <div className='flex items-center justify-center w-16 h-16 text-white bg-blue-500 rounded-full'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-white'>Feature Three</h3>
            <p className='text-base text-white'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas
              necessitatibus voluptates. Quisquam, ex ratione.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
