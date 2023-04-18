import Image from 'next/image';
interface CustomCardProps {
  image: string;
  Title: string;
  Description: string;
}

export default function StackedCard({ image, Title, Description }: CustomCardProps) {
  return (
    <div className='max-w-sm rounded-md overflow-hidden shadow-lg border-gray-700 border bg-gray-700 bg-opacity-25 backdrop-blur-sm'>
      <Image className='w-full' src={image} width={300} height={500} alt={Title} />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2 text-white'>{Title}</div>
        <p className='text-white text-base'>{Description}</p>
      </div>
    </div>
  );
}
