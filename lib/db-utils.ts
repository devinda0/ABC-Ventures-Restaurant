import { prisma } from './prisma'

// Restaurant utilities
export const restaurantUtils = {
  // Get all restaurants with basic info
  async getAll() {
    return await prisma.restaurant.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { reviews: true }
        }
      },
      orderBy: { rating: 'desc' }
    })
  },

  // Get restaurant by slug with full details
  async getBySlug(slug: string) {
    return await prisma.restaurant.findUnique({
      where: { slug },
      include: {
        tables: true,
        menuItems: {
          include: { category: true },
          where: { isAvailable: true },
          orderBy: [
            { category: { sortOrder: 'asc' } },
            { sortOrder: 'asc' },
            { name: 'asc' }
          ]
        },
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
          where: { isVisible: true },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: { reviews: true, reservations: true }
        }
      }
    })
  },

  // Get restaurants by cuisine
  async getByCuisine(cuisine: string) {
    return await prisma.restaurant.findMany({
      where: { 
        cuisine: { contains: cuisine },
        isActive: true 
      },
      include: {
        _count: { select: { reviews: true } }
      }
    })
  }
}

// Menu utilities
export const menuUtils = {
  // Get menu categories with items for a restaurant
  async getMenuByRestaurant(restaurantId: string) {
    return await prisma.menuCategory.findMany({
      include: {
        menuItems: {
          where: { 
            restaurantId,
            isAvailable: true 
          },
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: { sortOrder: 'asc' }
    })
  },

  // Search menu items
  async searchItems(query: string, restaurantId?: string) {
    return await prisma.menuItem.findMany({
      where: {
        AND: [
          restaurantId ? { restaurantId } : {},
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } }
            ]
          },
          { isAvailable: true }
        ]
      },
      include: {
        restaurant: { select: { name: true, slug: true } },
        category: { select: { name: true } }
      }
    })
  }
}

// Reservation utilities
export const reservationUtils = {
  // Create a new reservation
  async create(data: {
    restaurantId: string
    reservationDate: Date
    timeSlot: string
    partySize: number
    customerName: string
    customerEmail: string
    customerPhone: string
    specialRequests?: string
    userId?: string
  }) {
    return await prisma.reservation.create({
      data,
      include: {
        restaurant: { select: { name: true, address: true, phone: true } }
      }
    })
  },

  // Get available time slots for a restaurant on a specific date
  async getAvailableSlots(restaurantId: string, date: Date) {
    const reservations = await prisma.reservation.findMany({
      where: {
        restaurantId,
        reservationDate: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999))
        },
        status: { in: ['PENDING', 'CONFIRMED'] }
      },
      include: { table: true }
    })

    const tables = await prisma.table.findMany({
      where: { restaurantId, isActive: true }
    })

    // This is a simplified version - you'd implement more complex logic
    // to determine actual availability based on table capacity and time slots
    return {
      availableSlots: [
        '17:00-19:00',
        '19:00-21:00',
        '21:00-23:00'
      ],
      totalTables: tables.length,
      reservedSlots: reservations.length
    }
  }
}

// Order utilities
export const orderUtils = {
  // Create a new order
  async create(data: {
    userId?: string
    items: Array<{ menuItemId: string; quantity: number; specialNotes?: string }>
    orderType: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'
    deliveryAddress?: string
    specialInstructions?: string
  }) {
    const { items, ...orderData } = data

    // Calculate totals
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map(item => item.menuItemId) } }
    })

    let totalAmount = 0
    const orderItems = items.map(item => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId)
      if (!menuItem) throw new Error(`Menu item ${item.menuItemId} not found`)
      
      const itemTotal = Number(menuItem.price) * item.quantity
      totalAmount += itemTotal

      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice: menuItem.price,
        totalPrice: itemTotal,
        specialNotes: item.specialNotes
      }
    })

    return await prisma.order.create({
      data: {
        ...orderData,
        totalAmount,
        orderItems: {
          create: orderItems
        }
      },
      include: {
        orderItems: {
          include: { menuItem: true }
        }
      }
    })
  },

  // Get order by ID
  async getById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: { menuItem: { include: { restaurant: true } } }
        },
        user: { select: { name: true, email: true, phone: true } }
      }
    })
  }
}

// Cart utilities
export const cartUtils = {
  // Get or create cart
  async getOrCreate(identifier: { userId?: string; sessionId?: string }) {
    let cart = await prisma.cart.findFirst({
      where: identifier.userId 
        ? { userId: identifier.userId }
        : { sessionId: identifier.sessionId },
      include: {
        cartItems: {
          include: { menuItem: { include: { restaurant: true } } }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          ...identifier,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        },
        include: {
          cartItems: {
            include: { menuItem: { include: { restaurant: true } } }
          }
        }
      })
    }

    return cart
  },

  // Add item to cart
  async addItem(cartId: string, menuItemId: string, quantity: number = 1, specialNotes?: string) {
    return await prisma.cartItem.upsert({
      where: {
        cartId_menuItemId: { cartId, menuItemId }
      },
      update: {
        quantity: { increment: quantity },
        specialNotes
      },
      create: {
        cartId,
        menuItemId,
        quantity,
        specialNotes
      },
      include: {
        menuItem: true
      }
    })
  },

  // Remove item from cart
  async removeItem(cartId: string, menuItemId: string) {
    return await prisma.cartItem.delete({
      where: {
        cartId_menuItemId: { cartId, menuItemId }
      }
    })
  },

  // Clear cart
  async clear(cartId: string) {
    return await prisma.cartItem.deleteMany({
      where: { cartId }
    })
  }
}

// Review utilities
export const reviewUtils = {
  // Create a review
  async create(data: {
    userId: string
    restaurantId: string
    rating: number
    comment?: string
  }) {
    const review = await prisma.review.create({
      data,
      include: {
        user: { select: { name: true, avatar: true } },
        restaurant: { select: { name: true } }
      }
    })

    // Update restaurant rating
    const avgRating = await prisma.review.aggregate({
      where: { restaurantId: data.restaurantId },
      _avg: { rating: true }
    })

    await prisma.restaurant.update({
      where: { id: data.restaurantId },
      data: { rating: avgRating._avg.rating || 0 }
    })

    return review
  },

  // Get reviews for a restaurant
  async getByRestaurant(restaurantId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    return await prisma.review.findMany({
      where: { restaurantId, isVisible: true },
      include: {
        user: { select: { name: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })
  }
}