import React from 'react';

export default function FeatureSection() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full bg-gray-100'>
      <div className='flex flex-col items-center justify-center w-full h-full max-w-6xl px-4 py-16 mx-auto space-y-8 text-center'>
        <h2 className='text-4xl font-bold text-gray-800'>Features</h2>
        <p className='max-w-xl text-xl text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas necessitatibus
          voluptates. Quisquam, ex ratione.
        </p>
        <div className='flex flex-wrap items-center justify-center w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-8'>
          <div className='flex flex-col items-center justify-center w-full max-w-sm space-y-4'>
            <div className='flex items-center justify-center w-16 h-16 text-white bg-indigo-500 rounded-full'>
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
            <h3 className='text-xl font-bold text-gray-800'>Feature One</h3>
            <p className='text-base text-gray-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas
              necessitatibus voluptates. Quisquam, ex ratione.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center w-full max-w-sm space-y-4'>
            <div className='flex items-center justify-center w-16 h-16 text-white bg-indigo-500 rounded-full'>
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
            <h3 className='text-xl font-bold text-gray-800'>Feature Two</h3>
            <p className='text-base text-gray-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptas
              necessitatibus voluptates. Quisquam, ex ratione.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
