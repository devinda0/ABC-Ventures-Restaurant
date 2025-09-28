import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const restaurantImagePool = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyh4vbp8gFcBYED1-p8PfGQlJdm4FpUBU2Gg&s',
  'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdg4cDCD6OkQuOryM4KVSSD4xFmCUaz9Yig&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0EqHI6h5QgFTXGG_1i2FADG1xulRbVtecA&s',
  'https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'
]

const mealImagePool = [
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPp9WprooC4zgRcZ35hMIGdxwmyDLKOaJrENlLNQFLN9pgGSZ0utWDNcH7an81KsFHIbk&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYS56Djrv15DF5dsVtUi47dMzbMPR0Pf5H0Wh4-ci9GmH24VGd5ObxHZVTjtM5geCtRc&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-grVKReQRm3IlU_vrU0Ey261ShcqNzovY3ewGozoh_O8EQSIdOhVBkWzOuwbsPDJ-ZQ&usqp=CAU'
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.cart.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.restaurant_Meals.deleteMany()
  await prisma.meal.deleteMany()
  await prisma.restaurant.deleteMany()

  console.log('🧹 Cleared existing data')

  // Create restaurants
  const restaurants = await prisma.restaurant.createMany({
    data: [
      {
        name: 'ABC Ventures',
        displayName: 'City A',
        subtitle: 'Fine Dining Excellence',
        tagline: 'Where every meal is a masterpiece',
        description: 'Experience culinary artistry at its finest with our carefully crafted dishes made from the freshest ingredients. Our award-winning chefs bring you flavors from around the world.',
        cuisine: 'International',
        rating: 4.8,
        reviews: 245,
        image: restaurantImagePool[0],
        gallery: JSON.stringify([
          restaurantImagePool[1],
          restaurantImagePool[2],
          restaurantImagePool[3]
        ]),
        city: 'City A',
        address: '123 Main Street, City A, ST 10001',
        phone: '+1 (555) 123-4567',
        email: 'citya@abcventures.com',
        website: 'https://abcventures.com/citya'
      },
      {
        name: 'ABC Ventures',
        displayName: 'City B',
        subtitle: 'Authentic Italian Cuisine',
        tagline: 'Traditional recipes, modern taste',
        description: 'Bringing you the authentic taste of Italy with our wood-fired pizzas and homemade pasta. Family recipes passed down through generations.',
        cuisine: 'Italian',
        rating: 4.6,
        reviews: 189,
        image: restaurantImagePool[1],
        gallery: JSON.stringify([
          restaurantImagePool[2],
          restaurantImagePool[3],
          restaurantImagePool[4]
        ]),
        city: 'City B',
        address: '456 Central Avenue, City B, ST 60601',
        phone: '+1 (555) 234-5678',
        email: 'cityb@abcventures.com',
        website: 'https://abcventures.com/cityb'
      },
      {
        name: 'ABC Ventures',
        displayName: 'City C',
        subtitle: 'Fresh Japanese Cuisine',
        tagline: 'Freshness you can taste',
        description: 'Premium sushi and Japanese cuisine prepared by master chefs. We source the finest fish daily to ensure the highest quality dining experience.',
        cuisine: 'Japanese',
        rating: 4.9,
        reviews: 312,
        image: restaurantImagePool[2],
        gallery: JSON.stringify([
          restaurantImagePool[3],
          restaurantImagePool[4],
          restaurantImagePool[0]
        ]),
        city: 'City C',
        address: '789 Ocean Boulevard, City C, ST 90028',
        phone: '+1 (555) 345-6789',
        email: 'cityc@abcventures.com',
        website: 'https://abcventures.com/cityc'
      },
      {
        name: 'ABC Ventures',
        displayName: 'City D',
        subtitle: 'Authentic Indian Flavors',
        tagline: 'Spices that tell a story',
        description: 'Journey through India with our diverse menu featuring regional specialties and traditional cooking methods. Vegetarian and vegan options available.',
        cuisine: 'Indian',
        rating: 4.7,
        reviews: 156,
        image: restaurantImagePool[3],
        gallery: JSON.stringify([
          restaurantImagePool[4],
          restaurantImagePool[0],
          restaurantImagePool[1]
        ]),
        city: 'City D',
        address: '321 Park Street, City D, ST 94105',
        phone: '+1 (555) 456-7890',
        email: 'cityd@abcventures.com',
        website: 'https://abcventures.com/cityd'
      }
    ]
  })

  console.log('🏪 Created restaurants')

  // Create meals
  const baseMeals = [
    // Breakfast items
    {
      title: 'Classic Eggs Benedict',
      description: 'Poached eggs on English muffins with Canadian bacon and hollandaise sauce',
      price: 16.99,
      childPrice: 12.99,
      badge: 'Popular',
      type: 'breakfast',
      category: 'Breakfast'
    },
    {
      title: 'Fluffy Pancakes',
      description: 'Stack of three fluffy pancakes with maple syrup and butter',
      price: 12.99,
      childPrice: 8.99,
      type: 'breakfast',
      category: 'Breakfast'
    },
    {
      title: 'Avocado Toast',
      description: 'Smashed avocado on sourdough with cherry tomatoes and feta cheese',
      price: 14.99,
      childPrice: 10.99,
      badge: 'Healthy',
      type: 'breakfast',
      category: 'Breakfast'
    },
    {
      title: 'Fresh Fruit Bowl',
      description: 'Seasonal fresh fruits with granola and honey yogurt',
      price: 11.99,
      childPrice: 7.99,
      badge: 'Healthy',
      type: 'breakfast',
      category: 'Breakfast'
    },

    // Lunch items
    {
      title: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan cheese, croutons and Caesar dressing',
      price: 13.99,
      childPrice: 9.99,
      type: 'lunch',
      category: 'Lunch'
    },
    {
      title: 'Grilled Chicken Sandwich',
      description: 'Grilled chicken breast with lettuce, tomato, and mayo on brioche bun',
      price: 15.99,
      childPrice: 11.99,
      type: 'lunch',
      category: 'Lunch'
    },
    {
      title: 'Fish Tacos',
      description: 'Three soft tacos with grilled fish, cabbage slaw, and chipotle sauce',
      price: 17.99,
      childPrice: 12.99,
      badge: 'Spicy',
      type: 'lunch',
      category: 'Lunch'
    },
    {
      title: 'Quinoa Buddha Bowl',
      description: 'Quinoa with roasted vegetables, chickpeas, and tahini dressing',
      price: 16.99,
      childPrice: 12.99,
      badge: 'Vegan',
      type: 'lunch',
      category: 'Lunch'
    },

    // Dinner items
    {
      title: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon herb butter, served with seasonal vegetables',
      price: 28.99,
      childPrice: 18.99,
      badge: 'Chef Special',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Ribeye Steak',
      description: '12oz prime ribeye steak cooked to perfection with garlic mashed potatoes',
      price: 34.99,
      childPrice: 22.99,
      badge: 'Premium',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Lobster Risotto',
      description: 'Creamy arborio rice with fresh lobster meat and parmesan cheese',
      price: 32.99,
      childPrice: 20.99,
      badge: 'Luxury',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Vegetarian Pasta',
      description: 'Penne pasta with roasted vegetables in basil pesto sauce',
      price: 19.99,
      childPrice: 14.99,
      badge: 'Vegetarian',
      type: 'dinner',
      category: 'Dinner'
    },

    // Italian cuisine
    {
      title: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
      price: 18.99,
      childPrice: 12.99,
      badge: 'Classic',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Pepperoni Pizza',
      description: 'Traditional pepperoni pizza with mozzarella and tomato sauce',
      price: 20.99,
      childPrice: 14.99,
      badge: 'Popular',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Spaghetti Carbonara',
      description: 'Traditional Roman pasta with eggs, cheese, pancetta, and black pepper',
      price: 22.99,
      childPrice: 16.99,
      type: 'dinner',
      category: 'Dinner'
    },

    // Japanese cuisine
    {
      title: 'Salmon Sashimi',
      description: 'Fresh Atlantic salmon sliced thin, served with wasabi and soy sauce',
      price: 24.99,
      childPrice: 16.99,
      badge: 'Fresh',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'California Roll',
      description: 'Crab meat, avocado, and cucumber wrapped in seaweed and rice',
      price: 12.99,
      childPrice: 8.99,
      type: 'lunch',
      category: 'Lunch'
    },
    {
      title: 'Chirashi Bowl',
      description: 'Assorted fresh fish over seasoned sushi rice',
      price: 26.99,
      childPrice: 18.99,
      badge: 'Chef Special',
      type: 'dinner',
      category: 'Dinner'
    },

    // Indian cuisine
    {
      title: 'Butter Chicken',
      description: 'Tender chicken in creamy tomato-based curry sauce',
      price: 21.99,
      childPrice: 15.99,
      badge: 'Popular',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Vegetable Biryani',
      description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
      price: 18.99,
      childPrice: 13.99,
      badge: 'Vegetarian',
      type: 'dinner',
      category: 'Dinner'
    },
    {
      title: 'Lamb Vindaloo',
      description: 'Spicy lamb curry with potatoes in traditional Goan style',
      price: 24.99,
      childPrice: 17.99,
      badge: 'Spicy',
      type: 'dinner',
      category: 'Dinner'
    },

    // Events & Offers items
    {
      title: 'Wedding Package Deluxe',
      description: '3-course meal package for special wedding celebrations including appetizer, main course, and dessert',
      price: 89.99,
      childPrice: 45.99,
      badge: 'Premium Event',
      type: 'events',
      category: 'Events'
    },
    {
      title: 'Birthday Party Special',
      description: 'Complete birthday celebration package with cake, decorations, and meal for parties of 10+',
      price: 299.99,
      childPrice: 149.99,
      badge: 'Party Package',
      type: 'events',
      category: 'Events'
    },
    {
      title: 'Happy Hour Special',
      description: '50% off selected appetizers and beverages during happy hours (4-6 PM)',
      price: 24.99,
      childPrice: 12.99,
      badge: '50% Off',
      type: 'offers',
      category: 'Offers'
    },
    {
      title: 'Weekend Brunch Combo',
      description: 'Special weekend offer: Any breakfast item + drink + dessert for a discounted price',
      price: 29.99,
      childPrice: 19.99,
      badge: 'Weekend Special',
      type: 'offers',
      category: 'Offers'
    }
  ]

  const meals = await prisma.meal.createMany({
    data: baseMeals.map((meal, index) => ({
      ...meal,
      image: mealImagePool[index % mealImagePool.length]
    }))
  })

  console.log('🍽️ Created meals')

  // Get created restaurants and meals
  const createdRestaurants = await prisma.restaurant.findMany()
  const createdMeals = await prisma.meal.findMany()

  // Create restaurant-meal relationships
  const restaurantMealRelations = []

  // ABC Ventures - City A - International (all types of meals)
  const abcCityA = createdRestaurants.find(r => r.displayName === 'City A')
  if (abcCityA) {
    const cityAMeals = createdMeals.filter(m => 
      ['Classic Eggs Benedict', 'Grilled Salmon', 'Ribeye Steak', 'Lobster Risotto', 'Caesar Salad', 'Grilled Chicken Sandwich', 'Happy Hour Special', 'Weekend Brunch Combo'].includes(m.title)
    )
    for (const meal of cityAMeals) {
      restaurantMealRelations.push({
        restaurantId: abcCityA.id,
        mealId: meal.id,
        isAvailable: true
      })
    }
  }

  // ABC Ventures - City B - Italian
  const abcCityB = createdRestaurants.find(r => r.displayName === 'City B')
  if (abcCityB) {
    const italianMeals = createdMeals.filter(m => 
      ['Margherita Pizza', 'Pepperoni Pizza', 'Spaghetti Carbonara', 'Vegetarian Pasta', 'Caesar Salad', 'Wedding Package Deluxe'].includes(m.title)
    )
    for (const meal of italianMeals) {
      restaurantMealRelations.push({
        restaurantId: abcCityB.id,
        mealId: meal.id,
        isAvailable: true
      })
    }
  }

  // ABC Ventures - City C - Japanese
  const abcCityC = createdRestaurants.find(r => r.displayName === 'City C')
  if (abcCityC) {
    const japaneseMeals = createdMeals.filter(m => 
      ['Salmon Sashimi', 'California Roll', 'Chirashi Bowl', 'Birthday Party Special'].includes(m.title)
    )
    for (const meal of japaneseMeals) {
      restaurantMealRelations.push({
        restaurantId: abcCityC.id,
        mealId: meal.id,
        isAvailable: true
      })
    }
  }

  // ABC Ventures - City D - Indian
  const abcCityD = createdRestaurants.find(r => r.displayName === 'City D')
  if (abcCityD) {
    const indianMeals = createdMeals.filter(m => 
      ['Butter Chicken', 'Vegetable Biryani', 'Lamb Vindaloo', 'Fresh Fruit Bowl', 'Fluffy Pancakes'].includes(m.title)
    )
    for (const meal of indianMeals) {
      restaurantMealRelations.push({
        restaurantId: abcCityD.id,
        mealId: meal.id,
        isAvailable: true
      })
    }
  }

  // Create all restaurant-meal relationships
  await prisma.restaurant_Meals.createMany({
    data: restaurantMealRelations
  })

  console.log('🔗 Created restaurant-meal relationships')

  // Create sample reservations
  const sampleReservations = []
  const today = new Date()
  
  for (let i = 0; i < 10; i++) {
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1)
    
    const restaurant = createdRestaurants[Math.floor(Math.random() * createdRestaurants.length)]
    const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30']
    const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Emma Davis']
    const emails = ['john@example.com', 'jane@example.com', 'mike@example.com', 'sarah@example.com', 'david@example.com', 'emma@example.com']
    
    sampleReservations.push({
      restaurantId: restaurant.id,
      name: names[Math.floor(Math.random() * names.length)],
      email: emails[Math.floor(Math.random() * emails.length)],
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      date: futureDate,
      time: times[Math.floor(Math.random() * times.length)],
      adultCount: Math.floor(Math.random() * 4) + 1,
      childCount: Math.floor(Math.random() * 3),
      specialRequests: Math.random() > 0.7 ? 'Please prepare a table by the window' : null,
      status: Math.random() > 0.2 ? 'confirmed' : 'pending',
      totalAmount: (Math.random() * 200 + 50).toFixed(2)
    })
  }

  await prisma.reservation.createMany({
    data: sampleReservations
  })

  console.log('📅 Created sample reservations')

  console.log('✅ Database seeding completed successfully!')
  console.log(`Created:`)
  console.log(`- ${createdRestaurants.length} restaurants`)
  console.log(`- ${createdMeals.length} meals`)
  console.log(`- ${restaurantMealRelations.length} restaurant-meal relationships`)
  console.log(`- ${sampleReservations.length} reservations`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })