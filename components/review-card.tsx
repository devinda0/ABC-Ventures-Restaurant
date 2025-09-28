import React from 'react';
import Image from 'next/image';
import type { ReviewCardProps } from '@/types';

export default function ReviewCard({
  name,
  rating,
  review,
  date,
  profileImage
}: ReviewCardProps) {
  // Generate star rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
      {/* Header with profile image, name, and rating */}
      <div className="flex items-center gap-6 mb-6">
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={profileImage}
            alt={`${name} profile`}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Name and Rating */}
        <div className="flex-1">
          <h3 className="text-base font-secondary-heading font-medium text-foreground mb-2">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-foreground">
              {rating}/5
            </span>
            <div className="flex gap-1">
              {renderStars(rating)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Text */}
      <div className="mb-6">
        <p className="text-[#AAAAAA] text-sm font-normal font-body leading-relaxed">
          &ldquo;{review}&rdquo;
        </p>
      </div>
      
      {/* Date */}
      <div className="flex justify-end">
        <span className="text-[#CACACA] font-normal text-sm font-body">
          {date}
        </span>
      </div>
    </div>
  );
}