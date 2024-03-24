import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  subtitle: string;
  image: any; 
  more: string;
}

const Hcard: React.FC<CardProps> = ({ title, subtitle, image, more }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden w-[350px] h-full bg-slate-200 ">
      <Image
        src={image}
        alt={title}
        layout='responsive'
        className="object-cover w-[400px] h-[100px] "
      />
      <div className="p-4 ">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-black">{subtitle}</p>
        <Link href="https://simpy.readthedocs.io/en/latest/" className='text-blue-500 hover:text-blue-700'>{more}</Link>
      </div>
      
    </div>
  );
};

export default Hcard;
