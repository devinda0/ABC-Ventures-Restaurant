import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MealCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  onViewMenu?: () => void;
  onReserveTable?: () => void;
}

export default function MealCard({
  title,
  description,
  price,
  image,
  onViewMenu,
  onReserveTable
}: MealCardProps) {
  return (
    <div className="bg-white rounded-tl-2xl rounded-br-2xl  shadow-lg overflow-hidden max-w-md mx-auto">
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
      
      {/* Content Section */}
      <div className="py-6 px-4">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-heading font-semibold text-foreground">
            {title}
          </h3>
          <span className="text-base font-semibold text-yellow-600 ml-4">
            {price}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground font-body font-normal text-sm mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Buttons */}
        <div className="flex justify-between items-center ">
          <Button
            variant="outline"
            className=" px-7 rounded-tl-2xl rounded-br-2xl rounded-bl-none rounded-tr-none text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={onViewMenu}
          >
            View Menu
          </Button>
          <Button
            variant="default"
            className="px-4 rounded-tl-2xl rounded-br-2xl rounded-bl-none rounded-tr-none text-base bg-primary hover:bg-primary/90"
            onClick={onReserveTable}
          >
            Reserve Table Now
          </Button>
        </div>
      </div>
    </div>
  );
}