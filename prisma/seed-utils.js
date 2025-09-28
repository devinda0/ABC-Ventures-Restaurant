const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const mealImagePool = [
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPp9WprooC4zgRcZ35hMIGdxwmyDLKOaJrENlLNQFLN9pgGSZ0utWDNcH7an81KsFHIbk&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYS56Djrv15DF5dsVtUi47dMzbMPR0Pf5H0Wh4-ci9GmH24VGd5ObxHZVTjtM5geCtRc&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-grVKReQRm3IlU_vrU0Ey261ShcqNzovY3ewGozoh_O8EQSIdOhVBkWzOuwbsPDJ-ZQ&usqp=CAU'
]

// Additional meal data for more variety
const baseAdditionalMeals = [
  // Appetizers
  {
    title: 'Bruschetta Trio',
    description: 'Three varieties of bruschetta with fresh tomatoes, olive tapenade, and ricotta',
    price: 14.99,
    childPrice: 9.99,
    type: 'lunch',
    category: 'appetizer'
  },
  {
    title: 'Calamari Rings',
    description: 'Crispy fried squid rings served with marinara sauce',
    price: 16.99,
    childPrice: 11.99,
    type: 'dinner',
    category: 'appetizer'
  },
  {
    title: 'Chicken Wings',
    description: 'Buffalo wings with celery sticks and blue cheese dip',
    price: 13.99,
    childPrice: 9.99,
    badge: 'Spicy',
    type: 'lunch',
    category: 'appetizer'
  },

  // Desserts
  {
    title: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 9.99,
    childPrice: 7.99,
    badge: 'Popular',
    type: 'dinner',
    category: 'dessert'
  },
  {
    title: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 8.99,
    childPrice: 6.99,
    type: 'dinner',
    category: 'dessert'
  },
  {
    title: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake with graham cracker crust',
    price: 8.99,
    childPrice: 6.99,
    type: 'dinner',
    category: 'dessert'
  },

  // Beverages
  {
    title: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 4.99,
    childPrice: 3.99,
    type: 'breakfast',
    category: 'beverage'
  },
  {
    title: 'Iced Coffee',
    description: 'Cold brew coffee served over ice',
    price: 3.99,
    childPrice: 2.99,
    type: 'breakfast',
    category: 'beverage'
  },
  {
    title: 'Green Tea',
    description: 'Premium Japanese green tea',
    price: 3.49,
    childPrice: 2.49,
    type: 'lunch',
    category: 'beverage'
  },

  // More international dishes
  {
    title: 'Pad Thai',
    description: 'Traditional Thai stir-fried noodles with shrimp, tofu, and peanuts',
    price: 19.99,
    childPrice: 14.99,
    badge: 'Spicy',
    type: 'dinner',
    category: 'noodles'
  },
  {
    title: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese, olives, and olive oil dressing',
    price: 15.99,
    childPrice: 11.99,
    badge: 'Healthy',
    type: 'lunch',
    category: 'salad'
  },
  {
    title: 'Fish and Chips',
    description: 'Beer-battered cod with crispy fries and mushy peas',
    price: 18.99,
    childPrice: 13.99,
    type: 'dinner',
    category: 'main course'
  }
]

const additionalMeals = baseAdditionalMeals.map((meal, index) => ({
  ...meal,
  image: mealImagePool[index % mealImagePool.length]
}))

// Function to seed additional meals
async function seedAdditionalMeals() {
  console.log('🌱 Adding additional meals...')
  
  await prisma.meal.createMany({
    data: additionalMeals,
    skipDuplicates: true
  })

  console.log('✅ Additional meals added successfully!')
}

// Function to clear all data
async function clearAllData() {
  console.log('🧹 Clearing all data...')
  
  await prisma.cart.deleteMany()
  await prisma.reservation.deleteMany()  
  await prisma.restaurant_Meals.deleteMany()
  await prisma.meal.deleteMany()
  await prisma.restaurant.deleteMany()
  
  console.log('✅ All data cleared!')
}

// Function to get seeding statistics
async function getSeedingStats() {
  const restaurants = await prisma.restaurant.count()
  const meals = await prisma.meal.count()
  const restaurantMeals = await prisma.restaurant_Meals.count()
  const reservations = await prisma.reservation.count()
  const cartItems = await prisma.cart.count()

  console.log('📊 Database Statistics:')
  console.log(`- Restaurants: ${restaurants}`)
  console.log(`- Meals: ${meals}`)
  console.log(`- Restaurant-Meal Relations: ${restaurantMeals}`)
  console.log(`- Reservations: ${reservations}`)
  console.log(`- Cart Items: ${cartItems}`)

  return {
    restaurants,
    meals,
    restaurantMeals,
    reservations,
    cartItems
  }
}

// Function to create sample cart items
async function seedSampleCartItems() {
  console.log('🛒 Creating sample cart items...')

  // Get some meals and create sample cart items
  const meals = await prisma.meal.findMany({ take: 5 })
  const restaurants = await prisma.restaurant.findMany({ take: 3 })

  const cartItems = []
  const sessionIds = ['guest-123', 'guest-456', 'guest-789']

  for (let i = 0; i < 8; i++) {
    const meal = meals[Math.floor(Math.random() * meals.length)]
    const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)]
    const sessionId = sessionIds[Math.floor(Math.random() * sessionIds.length)]

    cartItems.push({
      sessionId,
      mealId: meal.id,
      quantity: Math.floor(Math.random() * 3) + 1,
      childQuantity: Math.floor(Math.random() * 2),
      restaurantId: restaurant.id,
      date: new Date().toISOString().split('T')[0]
    })
  }

  await prisma.cart.createMany({
    data: cartItems
  })

  console.log(`✅ Created ${cartItems.length} sample cart items!`)
}

// Export utility functions for direct use
module.exports = {
  additionalMeals,
  seedAdditionalMeals,
  clearAllData,
  getSeedingStats,
  seedSampleCartItems,
  prisma
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2]

  switch (command) {
    case 'additional-meals':
      seedAdditionalMeals()
        .then(() => process.exit(0))
        .catch((e) => {
          console.error(e)
          process.exit(1)
        })
        .finally(() => prisma.$disconnect())
      break

    case 'cart-items':
      seedSampleCartItems()
        .then(() => process.exit(0))
        .catch((e) => {
          console.error(e)
          process.exit(1)
        })
        .finally(() => prisma.$disconnect())
      break

    case 'clear':
      clearAllData()
        .then(() => process.exit(0))
        .catch((e) => {
          console.error(e)
          process.exit(1)
        })
        .finally(() => prisma.$disconnect())
      break

    case 'stats':
      getSeedingStats()
        .then(() => process.exit(0))
        .catch((e) => {
          console.error(e)
          process.exit(1)
        })
        .finally(() => prisma.$disconnect())
      break

    default:
      console.log('Available commands:')
      console.log('- additional-meals: Add more meal varieties')
      console.log('- cart-items: Create sample cart items')
      console.log('- clear: Clear all data from database')
      console.log('- stats: Show database statistics')
      process.exit(0)
  }
}