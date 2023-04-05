interface CustomCardProps {
  Image: string;
  Title: string;
  Description: string;
}

export default function StackedCard({ Image, Title, Description }: CustomCardProps) {
  return (
    <div className='max-w-sm rounded-md overflow-hidden shadow-lg border-gray-700 border bg-gray-700 bg-opacity-25 backdrop-blur-sm'>
      <img className='w-full' src={Image} alt={Title} />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2 text-white'>{Title}</div>
        <p className='text-white text-base'>{Description}</p>
      </div>
    </div>
  );
}
