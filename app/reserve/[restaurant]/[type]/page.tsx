'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Star, Calendar, Minus, Plus } from 'lucide-react';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import ReviewCard from '@/components/review-card';


const reviews = [
  {
    name: "John Doe",
    rating: 5,
    review: "Amazing experience! Great food and excellent service. Will definitely come back again. Highly recommended!",
    date: "2023-10-01",
    profileImage: "/profile/1.jpg"
  },
  {
    name: "Jane Smith",
    rating: 4,
    review: "Very good food, but the service was a bit slow. Overall, a pleasant dining experience. Would visit again.",
    date: "2023-09-28",
    profileImage: "/profile/1.jpg"
  },
  {
    name: "Alice Johnson",
    rating: 5,
    review: "Absolutely loved the ambiance and the food was top-notch! The staff were friendly and attentive. A must-visit place!",
    date: "2023-09-15",
    profileImage: "/profile/1.jpg"
  },
  {
    name: "Bob Brown",
    rating: 3,
    review: "The food was average and nothing special. The service could be improved. Not sure if I would return.",
    date: "2023-08-30",
    profileImage: "/profile/1.jpg"
  },
  {
    name: "Emily Davis",
    rating: 4,
    review: "Had a great time! The food was delicious and the atmosphere was lovely. Will recommend to friends.",
    date: "2023-08-25",
    profileImage: "/profile/1.jpg"
  },
  {
    name: "Michael Wilson",
    rating: 5,
    review: "Exceptional dining experience! The flavors were incredible and the presentation was beautiful. Five stars!",
    date: "2023-08-10",
    profileImage: "/profile/1.jpg"
  }
]


const restaurantData = {
  'abc-ventures': {
    name: 'ABC Ventures',
    city: 'City A',
    tagline: 'THE BEST CITY VIEW DINING'
  },
  'fine-dining': {
    name: 'Fine Dining Experience',
    city: 'City B',
    tagline: 'EXCEPTIONAL CULINARY EXPERIENCE'
  },
  'casual-eats': {
    name: 'Casual Eats',
    city: 'City C',
    tagline: 'RELAXED DINING ATMOSPHERE'
  }
};

const mealData = {
  breakfast: {
    title: 'Breakfast',
    subtitle: 'An Authentic Arabian Breakfast Experience',
    description: 'Come and enjoy our rich selection of traditional flavors from across the Middle East.',
    time: 'Breakfast Time (Monday to Sunday) - 6:30am to 10:30am',
    price: 1000,
    childPrice: 500,
    image: '/hero/home.png',
    gallery: ['/hero/home.png', '/hero/home.png', '/hero/home.png'],
    currency: 'USD',
    rating: 5,
    reviews: 6
  },
  lunch: {
    title: 'Lunch',
    subtitle: 'Exquisite Lunch Experience',
    description: 'Savor our carefully crafted lunch menu featuring the finest ingredients and traditional recipes.',
    time: 'Lunch Time (Monday to Sunday) - 12:00pm to 3:30pm',
    price: 1500,
    childPrice: 750,
    image: '/hero/home.png',
    gallery: ['/hero/home.png', '/hero/home.png', '/hero/home.png'],
    currency: 'USD',
    rating: 5,
    reviews: 8
  },
  dinner: {
    title: 'Dinner',
    subtitle: 'Premium Dinner Experience',
    description: 'Indulge in our elegant dinner service with authentic Middle Eastern cuisine and exceptional hospitality.',
    time: 'Dinner Time (Monday to Sunday) - 6:00pm to 11:00pm',
    price: 2000,
    childPrice: 1000,
    image: '/hero/home.png',
    gallery: ['/hero/home.png', '/hero/home.png', '/hero/home.png'],
    currency: 'USD',
    rating: 5,
    reviews: 12
  }
};

export default function ReservePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [adultTickets, setAdultTickets] = useState(1);
  const [kidTickets, setKidTickets] = useState(0);
  const [mainImage, setMainImage] = useState(0);

  const restaurantKey = params.restaurant as string;
  const mealType = params.type as string;
  
  const restaurant = restaurantData[restaurantKey as keyof typeof restaurantData] || restaurantData['abc-ventures'];
  const meal = mealData[mealType.toLowerCase() as keyof typeof mealData];

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Meal type not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const tabs = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Events', 'Offers'];
  const totalCost = (adultTickets * meal.price) + (kidTickets * meal.childPrice);

  const handleGoBack = () => {
    router.back();
  };

  const handleViewMenu = () => {
    // Placeholder for view menu functionality
    console.log('View Menu clicked');
  };

  const handleAddToCart = () => {
    // Placeholder for add to cart functionality
    console.log('Add to Cart clicked');
  };

  return (
    <>
    <Hero backgroundImage='/hero/home.png' />
    <div className="min-h-screen my-5">
      {/* Header */}
      <div className="top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleGoBack}
              className="flex items-center text-primary font-secondary-heading text-sm font-medium  transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.353 13.6463C11.5484 13.8416 11.5484 14.1583 11.353 14.3536C11.2557 14.4509 11.1277 14.5003 10.9997 14.5003C10.8717 14.5003 10.7436 14.4516 10.6463 14.3536L4.64632 8.35361C4.45098 8.15828 4.45098 7.84159 4.64632 7.64626L10.6463 1.64626C10.8417 1.45092 11.1583 1.45092 11.3537 1.64626C11.549 1.84159 11.549 2.15828 11.3537 2.35361L5.70699 8.00026L11.353 13.6463Z" fill="#8A1739"/>
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Title and Tagline */}
        <div className="text-center flex flex-col items-center">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2">
            <span className="text-primary">{restaurant.name}</span>
            {restaurant.tagline && (
            <>
                <span className="text-[#D4AF37] mx-2">-</span>
                <span className="text-[#D4AF37]">{restaurant.tagline}</span>
            </>
            )}
        </h1>
        <p className="font-secondary-heading translate-x-[14rem] font-semibold text-base text-[#D4AF37] tracking-widest uppercase">
            {restaurant.tagline}
        </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-end gap-2 my-8">
        {tabs.map((category) => (
            <Button
            key={category}
            variant={activeTab === category ? "default" : "outline"}
            className={`px-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none text-sm bg-[#8A8787] font-medium transition-colors ${
                activeTab === category
                ? ' text-primary '
                : ' text-white'
            }`}
            onClick={() => setActiveTab(category)}
            >
            {category}
            </Button>
        ))}
        </div>

        {/* Content Grid */}
        <h2 className="text-4xl font-heading text-primary font-medium mb-2">
            {meal.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image and Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/2] rounded-tl-2xl rounded-br-2xl overflow-hidden">
              <Image
                src={meal.gallery[mainImage]}
                alt={meal.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex flex-row justify-between gap-2">
              {meal.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative aspect-[3/2] h-[152px] rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 ${
                    mainImage === index ? 'border-red-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${meal.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Reviews Section */}
            <div className=" p-4 rounded-lg">
              <div className="p-3 text-sm text-foreground font-body font-normal">
                &ldquo;Reservation time and special requests can be mentioned in &lsquo;Add comments about your order&rsquo; section at the Checkout stage. (Limited to 50 characters)&rdquo;
              </div>
              <div className="flex items-center font-secondary-heading font-medium text-sm text-foreground px-10  justify-between gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="">|</span>
                <span className="">{meal.reviews} Reviews</span>
                <span className="">|</span>
                <button className="">
                  Write a Review
                </button>
              </div>
              
            </div>
          </div>

          {/* Right Column - Details and Booking */}
          <div className="space-y-6">
            <div>
              
              <h3 className="text-base font-body text-[#121417] font-medium mb-4">{meal.subtitle}</h3>
              <p className="text-base font-body text-[#121417] font-medium mb-4">{meal.description}</p>
              
              <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />

              <div className="rounded-lg mb-4">
                <p className="text-primary font-secondary-heading text-lg font-medium">{meal.time}</p>
              </div>

              <div className="mb-4">
                <p className="text-base text-foreground font-body font-medium mb-1">
                  Price - {meal.currency} {meal.price} net per adult & {meal.currency} {meal.childPrice} net per child (6-11 years of age)
                </p>
                <p className="text-xs text-foreground font-body font-light">Availability: In Stock</p>
              </div>

              <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />
              
              <div className="font-secondary-heading font-medium text-xl text-primary my-2">
                {meal.currency} {meal.price}
              </div>

              <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />
            </div>

            {/* Booking Form */}
            <h4 className="font-medium font-secondary-heading text-foreground text-sm mb-4">Available Options</h4>
            <p className="text-xs text-foreground font-body font-light mb-4">*Ticket Type & Quantity</p>

            {/* Ticket Selection */}
            <div className="flex justify-start items-center gap-9">
            {/* Adult Tickets */}
            <div className="flex flex-col items-center gap-2 justify-start p-4 rounded-tl-2xl rounded-br-2xl border px-8 border-primary">
                <div>
                <span className="font-medium text-yellow-600">Adults Ticket</span>
                </div>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => setAdultTickets(Math.max(0, adultTickets - 1))}
                    className="w-5 h-5 flex items-center justify-center hover:bg-gray-50"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 2.25H9C5.278 2.25 2.25 5.278 2.25 9V15C2.25 18.722 5.278 21.75 9 21.75H15C18.722 21.75 21.75 18.722 21.75 15V9C21.75 5.278 18.722 2.25 15 2.25ZM20.25 15C20.25 17.895 17.895 20.25 15 20.25H9C6.105 20.25 3.75 17.895 3.75 15V9C3.75 6.105 6.105 3.75 9 3.75H15C17.895 3.75 20.25 6.105 20.25 9V15ZM16.75 12C16.75 12.414 16.414 12.75 16 12.75H8C7.586 12.75 7.25 12.414 7.25 12C7.25 11.586 7.586 11.25 8 11.25H16C16.414 11.25 16.75 11.586 16.75 12Z" fill="#AAAAAA"/>
                    </svg>
                </button>
                <span className="font-medium min-w-[2rem] text-center">{adultTickets}</span>
                <button
                    onClick={() => setAdultTickets(adultTickets + 1)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-gray-50"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 0.25H7C3.278 0.25 0.25 3.278 0.25 7V13C0.25 16.722 3.278 19.75 7 19.75H13C16.722 19.75 19.75 16.722 19.75 13V7C19.75 3.278 16.722 0.25 13 0.25ZM18.25 13C18.25 15.895 15.895 18.25 13 18.25H7C4.105 18.25 1.75 15.895 1.75 13V7C1.75 4.105 4.105 1.75 7 1.75H13C15.895 1.75 18.25 4.105 18.25 7V13ZM14.75 10C14.75 10.414 14.414 10.75 14 10.75H10.75V14C10.75 14.414 10.414 14.75 10 14.75C9.586 14.75 9.25 14.414 9.25 14V10.75H6C5.586 10.75 5.25 10.414 5.25 10C5.25 9.586 5.586 9.25 6 9.25H9.25V6C9.25 5.586 9.586 5.25 10 5.25C10.414 5.25 10.75 5.586 10.75 6V9.25H14C14.414 9.25 14.75 9.586 14.75 10Z" fill="black"/>
                    </svg>
                </button>
                </div>
            </div>

            {/* Kids Tickets */}
            <div className="flex flex-col items-center gap-2 justify-start p-4 rounded-tl-2xl rounded-br-2xl border px-8 border-primary">
                <div>
                <span className="font-medium text-yellow-600">Kids Content</span>
                </div>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => setKidTickets(Math.max(0, kidTickets - 1))}
                    className="w-5 h-5 flex items-center justify-center hover:bg-gray-50"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 2.25H9C5.278 2.25 2.25 5.278 2.25 9V15C2.25 18.722 5.278 21.75 9 21.75H15C18.722 21.75 21.75 18.722 21.75 15V9C21.75 5.278 18.722 2.25 15 2.25ZM20.25 15C20.25 17.895 17.895 20.25 15 20.25H9C6.105 20.25 3.75 17.895 3.75 15V9C3.75 6.105 6.105 3.75 9 3.75H15C17.895 3.75 20.25 6.105 20.25 9V15ZM16.75 12C16.75 12.414 16.414 12.75 16 12.75H8C7.586 12.75 7.25 12.414 7.25 12C7.25 11.586 7.586 11.25 8 11.25H16C16.414 11.25 16.75 11.586 16.75 12Z" fill="#AAAAAA"/>
                    </svg>
                </button>
                <span className="font-medium min-w-[2rem] text-center">{kidTickets}</span>
                <button
                    onClick={() => setKidTickets(kidTickets + 1)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-gray-50"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 0.25H7C3.278 0.25 0.25 3.278 0.25 7V13C0.25 16.722 3.278 19.75 7 19.75H13C16.722 19.75 19.75 16.722 19.75 13V7C19.75 3.278 16.722 0.25 13 0.25ZM18.25 13C18.25 15.895 15.895 18.25 13 18.25H7C4.105 18.25 1.75 15.895 1.75 13V7C1.75 4.105 4.105 1.75 7 1.75H13C15.895 1.75 18.25 4.105 18.25 7V13ZM14.75 10C14.75 10.414 14.414 10.75 14 10.75H10.75V14C10.75 14.414 10.414 14.75 10 14.75C9.586 14.75 9.25 14.414 9.25 14V10.75H6C5.586 10.75 5.25 10.414 5.25 10C5.25 9.586 5.586 9.25 6 9.25H9.25V6C9.25 5.586 9.586 5.25 10 5.25C10.414 5.25 10.75 5.586 10.75 6V9.25H14C14.414 9.25 14.75 9.586 14.75 10Z" fill="black"/>
                    </svg>
                </button>
                </div>
            </div>
            </div>

            <div>
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  *Date Selection
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="- Please Select -"
                  />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />

              {/* Total Cost */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {meal.currency} {totalCost} net
                </div>
              </div>

              <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />


              {/* Action Buttons */}
              <div className="flex justify-end gap-7">
                <Button 
                  variant="outline" 
                  className=" px-8 py-5 rounded-none rounded-tl-2xl rounded-br-2xl"
                  onClick={handleViewMenu}
                >
                  View Menu
                </Button>
                <Button 
                  className=" px-10 py-5 flex flex-row items-center justify-center rounded-none rounded-tl-2xl rounded-br-2xl"
                  onClick={handleAddToCart}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7505 15.0012V18.0012C10.7505 18.4152 10.4145 18.7512 10.0005 18.7512C9.58652 18.7512 9.25052 18.4152 9.25052 18.0012V15.0012C9.25052 14.5872 9.58652 14.2512 10.0005 14.2512C10.4145 14.2512 10.7505 14.5872 10.7505 15.0012ZM14.0005 14.2512C13.5865 14.2512 13.2505 14.5872 13.2505 15.0012V18.0012C13.2505 18.4152 13.5865 18.7512 14.0005 18.7512C14.4145 18.7512 14.7505 18.4152 14.7505 18.0012V15.0012C14.7505 14.5872 14.4145 14.2512 14.0005 14.2512ZM20.1975 12.4652L19.4305 18.4752C19.1925 20.3422 17.5935 21.7502 15.7105 21.7502H8.31253C6.43653 21.7502 4.83751 20.3472 4.59451 18.4872L3.8045 12.4652C2.8875 12.0182 2.24951 11.0862 2.24951 10.0002C2.24951 8.48321 3.48251 7.25021 4.99951 7.25021H6.57553L9.35651 2.61423C9.56951 2.25923 10.0305 2.14315 10.3855 2.35715C10.7405 2.57015 10.8565 3.0312 10.6425 3.3862L8.32352 7.25021H15.6745L13.3555 3.3862C13.1425 3.0312 13.2575 2.57015 13.6125 2.35715C13.9665 2.14415 14.4275 2.25923 14.6415 2.61423L17.4225 7.25021H19.0005C20.5175 7.25021 21.7505 8.48321 21.7505 10.0002C21.7505 11.0862 21.1135 12.0182 20.1975 12.4652ZM18.6485 12.7512H5.35553L6.08252 18.2932C6.22852 19.4092 7.18753 20.2512 8.31253 20.2512H15.7105C16.8395 20.2512 17.7995 19.4062 17.9415 18.2862L18.6485 12.7512ZM20.2505 10.0012C20.2505 9.31219 19.6895 8.75119 19.0005 8.75119H5.00052C4.31152 8.75119 3.75052 9.31219 3.75052 10.0012C3.75052 10.6902 4.31152 11.2512 5.00052 11.2512H19.0005C19.6895 11.2512 20.2505 10.6902 20.2505 10.0012Z" fill="white"/>
                    </svg>
                    <span>
                        Add To Cart
                    </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <section className='w-full my-8 px-10'>
          <h1 className=' text-4xl text-primary font-medium font-heading text-center my-8'>Reviews</h1>
          <div className=' w-full grid grid-cols-3 gap-7 px-10'>
              {
                reviews.map((review, index) => (
                  <ReviewCard 
                    key={index}
                    name={review.name}
                    rating={review.rating}
                    review={review.review}
                    date={review.date}
                    profileImage={review.profileImage}
                  />
                ))
              }
          </div>
      </section>

    <Footer />
    </>
  );
}