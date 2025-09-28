'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import ReviewCard from '@/components/review-card';
import { Calendar, ChevronLeft, Minus, Plus, Star } from 'lucide-react';
import { cartApi, restaurantApi, utils } from '@/lib/api-client';
import type { ReservePageParams, RestaurantWithMeals, Review } from '@/types';

type RestaurantMealRelation = RestaurantWithMeals['meals'][number];

const DEFAULT_CURRENCY = 'USD';
const FALLBACK_IMAGE = '/hero/home.png';
const PROFILE_PLACEHOLDER = 'https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg';

const STATIC_REVIEWS: Review[] = [
  {
    name: 'John Doe',
    rating: 5,
    review:
      'Amazing experience! Great food and excellent service. Will definitely come back again. Highly recommended!',
    date: '2023-10-01',
    profileImage: PROFILE_PLACEHOLDER,
  },
  {
    name: 'Jane Smith',
    rating: 4,
    review:
      'Very good food, but the service was a bit slow. Overall, a pleasant dining experience. Would visit again.',
    date: '2023-09-28',
    profileImage: PROFILE_PLACEHOLDER,
  },
  {
    name: 'Alice Johnson',
    rating: 5,
    review:
      'Absolutely loved the ambiance and the food was top-notch! The staff were friendly and attentive. A must-visit place!',
    date: '2023-09-15',
    profileImage: PROFILE_PLACEHOLDER,
  },
  {
    name: 'Bob Brown',
    rating: 3,
    review:
      'The food was average and nothing special. The service could be improved. Not sure if I would return.',
    date: '2023-08-30',
    profileImage: PROFILE_PLACEHOLDER,
  },
  {
    name: 'Emily Davis',
    rating: 4,
    review: 'Had a great time! The food was delicious and the atmosphere was lovely. Will recommend to friends.',
    date: '2023-08-25',
    profileImage: PROFILE_PLACEHOLDER,
  },
  {
    name: 'Michael Wilson',
    rating: 5,
    review:
      'Exceptional dining experience! The flavors were incredible and the presentation was beautiful. Five stars!',
    date: '2023-08-10',
    profileImage: PROFILE_PLACEHOLDER,
  },
];

interface ToNumberLike {
  toNumber: () => number;
}

interface ToStringLike {
  toString: () => string;
}

function normalizeParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return value ?? '';
}

function toNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  if (typeof value === 'object') {
    if ((value as ToNumberLike)?.toNumber && typeof (value as ToNumberLike).toNumber === 'function') {
      const numeric = (value as ToNumberLike).toNumber();
      return Number.isFinite(numeric) ? numeric : fallback;
    }

    if ((value as ToStringLike)?.toString && typeof (value as ToStringLike).toString === 'function') {
      const parsed = Number.parseFloat((value as ToStringLike).toString());
      return Number.isFinite(parsed) ? parsed : fallback;
    }
  }

  const coerced = Number(value);
  return Number.isFinite(coerced) ? coerced : fallback;
}

function formatCurrency(amount: number, currency = DEFAULT_CURRENCY): string {
  return utils.formatPrice(Number.isFinite(amount) ? amount : 0, currency);
}

function titleCase(value: string): string {
  if (!value) {
    return value;
  }
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeGallery(gallery: unknown): string[] {
  if (!gallery) {
    return [];
  }

  if (Array.isArray(gallery)) {
    return gallery.filter((item): item is string => typeof item === 'string' && item.length > 0);
  }

  if (typeof gallery === 'string') {
    try {
      const parsed = JSON.parse(gallery);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string' && item.length > 0);
      }
    } catch (error) {
      console.warn('Failed to parse gallery JSON', error);
    }
  }

  return [];
}

function LoadingPlaceholder() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-2/3 rounded bg-gray-200" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/2] rounded-3xl bg-gray-200" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="aspect-[3/2] rounded-2xl bg-gray-100" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="h-4 w-full rounded bg-gray-100" />
            ))}
            <div className="h-12 w-full rounded bg-gray-100" />
            <div className="h-12 w-full rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
  onBack,
}: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">We hit a snag</h2>
        <p className="text-red-700 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
          <Button onClick={onBack}>Go back</Button>
        </div>
      </div>
    </div>
  );
}

export default function ReservePage() {
  const params = useParams<ReservePageParams>();
  const router = useRouter();
  const isMountedRef = useRef(false);

  const restaurantParam = normalizeParam(params?.restaurant);
  const mealTypeParam = normalizeParam(params?.type);
  const normalizedMealType = mealTypeParam.toLowerCase();

  const [activeTab, setActiveTab] = useState(() => (mealTypeParam ? titleCase(mealTypeParam) : 'All'));
  const [selectedDate, setSelectedDate] = useState('');
  const [adultTickets, setAdultTickets] = useState(1);
  const [kidTickets, setKidTickets] = useState(0);
  const [mainImage, setMainImage] = useState(0);

  const [restaurant, setRestaurant] = useState<RestaurantWithMeals | null>(null);
  const [mealRelation, setMealRelation] = useState<RestaurantMealRelation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadReservationDetails = useCallback(async () => {
    if (!restaurantParam) {
      setRestaurant(null);
      setMealRelation(null);
      setError('Restaurant not specified.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await restaurantApi.getByName(restaurantParam);

      if (!isMountedRef.current) {
        return;
      }

      if (!response.success || !response.data) {
        setRestaurant(null);
        setMealRelation(null);
        setError(response.error ?? 'Unable to load reservation details right now.');
        return;
      }

      setRestaurant(response.data);

      const relation = response.data.meals.find((item) => {
        const rawType = typeof item.meal.type === 'string' ? item.meal.type.toLowerCase() : '';
        return rawType === normalizedMealType && item.isAvailable !== false;
      }) ??
      response.data.meals.find((item) => {
        const rawType = typeof item.meal.type === 'string' ? item.meal.type.toLowerCase() : '';
        return rawType === normalizedMealType;
      });

      if (!relation) {
        setMealRelation(null);
        setError('Requested meal type is not available at this restaurant right now.');
        return;
      }

      setMealRelation(relation);
      setError(null);
    } catch (err) {
      console.error('Failed to load reservation details', err);
      if (!isMountedRef.current) {
        return;
      }
      setRestaurant(null);
      setMealRelation(null);
      setError('Unable to load reservation details right now.');
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [normalizedMealType, restaurantParam]);

  useEffect(() => {
    loadReservationDetails();
  }, [loadReservationDetails]);

  useEffect(() => {
    if (mealTypeParam) {
      setActiveTab(titleCase(mealTypeParam));
    } else {
      setActiveTab('All');
    }
  }, [mealTypeParam]);

  useEffect(() => {
    if (!feedback) {
      return;
    }
    const timeout = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  useEffect(() => {
    setMainImage(0);
  }, [mealRelation?.meal.id]);

  const availableMealTypes = useMemo(() => {
    if (!restaurant) {
      return [] as string[];
    }

    const types = new Set<string>();
    restaurant.meals.forEach((relationship) => {
      if (relationship.isAvailable === false) {
        return;
      }
      const rawType = typeof relationship.meal.type === 'string' ? relationship.meal.type.toLowerCase() : '';
      if (rawType) {
        types.add(titleCase(rawType));
      }
    });
    return Array.from(types);
  }, [restaurant]);

  const tabs = useMemo(() => {
    const canonical = ['Breakfast', 'Lunch', 'Dinner'];
    const resolved = canonical.filter((label) => availableMealTypes.includes(label));
    return resolved.length > 0 ? ['All', ...resolved] : ['All', ...canonical];
  }, [availableMealTypes]);

  const galleryImages = useMemo(() => {
    const images = new Set<string>();

    if (mealRelation?.meal.image) {
      images.add(mealRelation.meal.image);
    }

    normalizeGallery(restaurant?.gallery).forEach((image) => images.add(image));

    if (restaurant?.image) {
      images.add(restaurant.image);
    }

    if (images.size === 0) {
      images.add(FALLBACK_IMAGE);
    }

    return Array.from(images);
  }, [mealRelation?.meal.image, restaurant?.gallery, restaurant?.image]);

  const adultPrice = useMemo(() => {
    return toNumber(mealRelation?.specialPrice ?? mealRelation?.meal.price, 0);
  }, [mealRelation?.meal.price, mealRelation?.specialPrice]);

  const childPrice = useMemo(() => {
    const value = mealRelation?.meal.childPrice;
    return value !== undefined && value !== null ? toNumber(value, 0) : 0;
  }, [mealRelation?.meal.childPrice]);

  const totalCost = adultTickets * adultPrice + kidTickets * childPrice;

  const heroImage = restaurant?.image ?? FALLBACK_IMAGE;
  const displayName = restaurant?.name ?? titleCase(utils.unslugify(restaurantParam));
  const displayTagline = restaurant?.tagline ?? restaurant?.subtitle ?? restaurant?.city ?? '';
  const mealTitle = mealRelation?.meal.title ?? titleCase(mealTypeParam);
  const mealSubtitle = mealRelation?.meal.category
    ? `${titleCase(mealRelation.meal.category)} · ${titleCase(normalizedMealType)}`
    : restaurant?.subtitle ?? '';
  const mealDescription = mealRelation?.meal.description ?? restaurant?.description ?? 'Details coming soon.';
  const mealAvailabilityLabel = mealRelation?.isAvailable === false ? 'Currently unavailable' : 'Available today';
  const availabilityColor = mealRelation?.isAvailable === false ? 'text-red-600' : 'text-emerald-600';
  const availabilityDetail = mealRelation?.isAvailable === false ? 'Out of stock' : 'In stock';
  const reviewCount = restaurant?.reviews ?? 0;
  const ratingValue = Math.round(Math.max(0, Math.min(5, restaurant?.rating ?? 0)));

  const disableAddToCart =
    submitting || !mealRelation || !selectedDate || (adultTickets <= 0 && kidTickets <= 0) || mealRelation.isAvailable === false;

  const handleGoBack = () => {
    router.back();
  };

  const handleTabSelect = (label: string) => {
    if (!restaurantParam) {
      return;
    }
    setActiveTab(label);
    if (label === 'All') {
      router.push(`/restaurant/${restaurantParam}`);
      return;
    }
    router.push(`/reserve/${restaurantParam}/${label.toLowerCase()}`);
  };

  const handleViewMenu = () => {
    router.push(`/restaurant/${restaurantParam}`);
  };

  const handleAddToCart = async () => {
    if (!mealRelation) {
      setFeedback({ type: 'error', text: 'Selected meal is unavailable.' });
      return;
    }

    if (!selectedDate) {
      setFeedback({ type: 'error', text: 'Please choose your reservation date first.' });
      return;
    }

    if (adultTickets <= 0 && kidTickets <= 0) {
      setFeedback({ type: 'error', text: 'Add at least one ticket before continuing.' });
      return;
    }

    setSubmitting(true);

    try {
      const sessionId = utils.getSessionId();
      const response = await cartApi.add({
        sessionId,
        mealId: mealRelation.meal.id,
        quantity: adultTickets,
        childQuantity: kidTickets,
        restaurantId: restaurant?.id,
        date: selectedDate,
      });

      if (response.success) {
        setFeedback({ type: 'success', text: 'Added to your cart! You can review it anytime.' });
      } else {
        setFeedback({ type: 'error', text: response.error ?? 'Could not add to cart just now.' });
      }
    } catch (error) {
      console.error('Failed to add reservation to cart', error);
      setFeedback({ type: 'error', text: 'Could not add to cart. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    loadReservationDetails();
  };

  return (
    <>
      <Hero backgroundImage={heroImage} activePage="Restaurant" />
      <div className="min-h-screen my-5">
        <div className="top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleGoBack}
                className="flex items-center text-primary font-secondary-heading text-sm font-medium transition-colors hover:text-primary/80"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingPlaceholder />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} onBack={handleGoBack} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center flex flex-col items-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2">
                <span className="text-primary">{displayName}</span>
                {displayTagline && (
                  <>
                    <span className="text-[#D4AF37] mx-2">-</span>
                    <span className="text-[#D4AF37]">{displayTagline}</span>
                  </>
                )}
              </h1>
              <p className="font-secondary-heading font-semibold text-base text-[#D4AF37] tracking-widest uppercase">
                {titleCase(normalizedMealType)} experience
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2 my-8">
              {tabs.map((category) => (
                <Button
                  key={category}
                  variant={activeTab === category ? 'default' : 'outline'}
                  className={`px-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none text-sm font-medium transition-colors ${
                    activeTab === category ? 'bg-[#8A1739] text-white hover:bg-[#70102d]' : 'bg-[#8A8787] text-white'
                  }`}
                  onClick={() => handleTabSelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <h2 className="text-4xl font-heading text-primary font-medium mb-6">{mealTitle}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="relative aspect-[3/2] rounded-tl-2xl rounded-br-2xl overflow-hidden">
                  <Image
                    src={galleryImages[mainImage]}
                    alt={mealTitle}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-row justify-between overflow-x-scroll gap-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setMainImage(index)}
                      className={`relative aspect-[3/2] h-[102px] rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 transition-colors ${
                        mainImage === index ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      type="button"
                    >
                      <Image src={img} alt={`${mealTitle} ${index + 1}`} height={102} width={152} className="object-cover aspect-[3/2] h-full" />
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="p-3 text-sm text-foreground font-body font-normal">
                    &ldquo;Reservation time and special requests can be mentioned in the comments section during checkout. Limited to 50 characters.&rdquo;
                  </div>
                  <div className="flex flex-wrap items-center font-secondary-heading font-medium text-sm text-foreground px-4 justify-between gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-300 hidden md:inline">|</span>
                    <span className="text-sm text-gray-700">{reviewCount} Reviews</span>
                    <span className="text-gray-300 hidden md:inline">|</span>
                    <button className="text-primary text-sm hover:underline" type="button">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-body text-[#121417] font-medium mb-4">{mealSubtitle}</h3>
                  <p className="text-base font-body text-[#121417] font-medium mb-4">{mealDescription}</p>

                  <div className="w-full h-[2px] bg-[#D4AF37] my-3" />

                  <div className="rounded-lg mb-4">
                    <p className={`text-sm font-secondary-heading font-semibold ${availabilityColor}`}>{mealAvailabilityLabel}</p>
                  </div>

                  <div className="mb-4 space-y-1">
                    <p className="text-base text-foreground font-body font-medium">
                      Price - {formatCurrency(adultPrice)} net per adult
                      {childPrice > 0 ? ` · ${formatCurrency(childPrice)} net per child (6-11 years)` : ''}
                    </p>
                    <p className="text-xs text-foreground font-body font-light">Availability: {availabilityDetail}</p>
                  </div>

                  <div className="w-full h-[2px] bg-[#D4AF37] my-3" />

                  <div className="font-secondary-heading font-medium text-xl text-primary my-2">
                    {formatCurrency(adultPrice)}
                  </div>

                  <div className="w-full h-[2px] bg-[#D4AF37] my-3" />
                </div>

                <h4 className="font-medium font-secondary-heading text-foreground text-sm mb-2">Available Options</h4>
                <p className="text-xs text-foreground font-body font-light mb-4">Ticket type & quantity</p>

                <div className="flex flex-wrap justify-start items-center gap-6">
                  <div className="flex flex-col items-center gap-2 justify-start p-4 rounded-tl-2xl rounded-br-2xl border px-8 border-primary">
                    <span className="font-medium text-yellow-600">Adult Tickets</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdultTickets(Math.max(0, adultTickets - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                        type="button"
                      >
                        <Minus className="w-4 h-4 text-gray-500" />
                      </button>
                      <span className="font-medium min-w-[2rem] text-center">{adultTickets}</span>
                      <button
                        onClick={() => setAdultTickets(adultTickets + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                        type="button"
                      >
                        <Plus className="w-4 h-4 text-gray-800" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 justify-start p-4 rounded-tl-2xl rounded-br-2xl border px-8 border-primary">
                    <span className="font-medium text-yellow-600">Kids Tickets</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setKidTickets(Math.max(0, kidTickets - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                        type="button"
                      >
                        <Minus className="w-4 h-4 text-gray-500" />
                      </button>
                      <span className="font-medium min-w-[2rem] text-center">{kidTickets}</span>
                      <button
                        onClick={() => setKidTickets(kidTickets + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                        type="button"
                      >
                        <Plus className="w-4 h-4 text-gray-800" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reservation-date">
                      Reservation date
                    </label>
                    <div className="relative">
                      <input
                        id="reservation-date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="- Please Select -"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="w-full h-[2px] bg-[#D4AF37] my-3" />

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                    <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalCost)} net</div>
                  </div>

                  <div className="w-full h-[2px] bg-[#D4AF37] my-3" />

                  {feedback && (
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        feedback.type === 'success'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {feedback.text}
                    </div>
                  )}

                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="px-8 py-5 rounded-none rounded-tl-2xl rounded-br-2xl"
                      onClick={handleViewMenu}
                      type="button"
                    >
                      View Menu
                    </Button>
                    <Button
                      className="px-10 py-5 flex flex-row items-center justify-center rounded-none rounded-tl-2xl rounded-br-2xl"
                      onClick={handleAddToCart}
                      disabled={disableAddToCart}
                      type="button"
                    >
                      {submitting ? 'Adding...' : 'Add To Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!loading && !error && (
        <section className="w-full my-8 px-4 sm:px-10">
          <h2 className="text-4xl text-primary font-medium font-heading text-center my-8">Reviews</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
            {STATIC_REVIEWS.map((review) => (
              <ReviewCard
                key={`${review.name}-${review.date}`}
                name={review.name}
                rating={review.rating}
                review={review.review}
                date={review.date}
                profileImage={review.profileImage}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
