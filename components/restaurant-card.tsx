import React from 'react';
import Image from 'next/image';

interface RestaurantCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

export default function RestaurantCard({
  title,
  image,
  onClick
}: RestaurantCardProps) {
  return (
    <div 
      className="bg-white rounded-tl-2xl rounded-br-2xl shadow-lg overflow-hidden max-w-md mx-auto cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="w-full">
        <Image
          src={image}
          alt={title}
          width={380}
          height={250}
          className="object-cover w-full h-auto"
          priority
        />
      </div>
      
      {/* Title Section */}
      <div className="py-4 px-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          {title}
        </h3>
      </div>
    </div>
  );
}