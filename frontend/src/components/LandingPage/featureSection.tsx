export default function FeatureSection() {
  const FeatureBullet = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
      <div className='flex flex-col items-center w-full max-w-sm space-y-4'>
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
        <h3 className='text-xl font-bold text-white'>{title}</h3>
        <p className='text-white '>{children}</p>
      </div>
    );
  };

  return (
    <div
      id='Features'
      className='w-full min-h-[calc(100vh-11rem)] bg-gray-900 py-24 sm:py-24 flex flex-col justify-between gap-5'>
      <div className='relative isolate overflow-hidden'>
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
      </div>
      <div className='flex flex-col items-center px-4 mx-auto text-center mb-5'>
        <h2 className='text-5xl font-bold tracking-tight sm:text-6xl text-white text-center mb-10'>
          Features
        </h2>
        <p className='max-w-xl text-xl text-white'>
          CoveyTown is an online platform that provides various features for users. It allows people
          to connect with anyone, anywhere.
        </p>
      </div>
      <div className='max-w-6xl px-4 pb-28 mx-auto space-y-8 text-center'>
        <div className='flex flex-wrap gap-10 items-center justify-center w-full max-w-4xl space-y-8 md:space-y-0 '>
          <FeatureBullet title='Virtual'>
            With CoveyTown&apos;s unique feature, users can easily talk to anyone, anywhere in the
            world. Whether it&apos;s for work or just to meet new people, you can join public rooms
            or create your own to connect with others who share your interests. You can also join
            private rooms to chat with friends, family, or colleagues without any interruptions.
            CoveyTown&apos;s talk-to-anyone, anywhere feature is perfect for anyone who wants to
            expand their network and make meaningful connections.
          </FeatureBullet>
          <FeatureBullet title='Private Chats'>
            On CoveyTown, users can engage in private 1 on 1 chats. This feature is perfect for
            those who prefer more intimate conversations or need to have private discussions. You
            can also create private rooms with multiple people, making it easy to collaborate with
            colleagues or have group discussions with friends. CoveyTown&apos;s private chat feature
            is perfect for anyone who values privacy and wants to keep their conversations secure.
          </FeatureBullet>
          <FeatureBullet title='Screen Sharing'>
            CoveyTown allows users to share their screen with the people around them. This feature
            is perfect for remote workers, teachers, and anyone who needs to share information
            quickly and easily. You can easily share your screen with others in a public or private
            room, making it easy to collaborate on projects or share information with a group.
            CoveyTown&apos;s screen sharing feature is perfect for anyone who needs to share
            information quickly and efficiently.
          </FeatureBullet>
        </div>
      </div>
    </div>
  );
}
