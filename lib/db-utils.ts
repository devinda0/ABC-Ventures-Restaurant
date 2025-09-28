import { Prisma } from '@prisma/client'
import { prisma } from './prisma'
import type {
  CreateCartRequest,
  UpdateCartRequest,
  CreateReservationRequest,
  UpdateReservationRequest
} from '@/types'

type RestaurantIncludeOptions = {
  includeMeals?: boolean
  includeReservations?: boolean
}

// Restaurant utilities aligned with the current Prisma schema
export const restaurantUtils = {
  async getAll(options: RestaurantIncludeOptions = {}) {
    const { includeMeals = false, includeReservations = false } = options

    return prisma.restaurant.findMany({
      include: {
        meals: includeMeals
          ? {
              include: { meal: true }
            }
          : undefined,
        reservations: includeReservations ? true : undefined
      },
      orderBy: [{ rating: 'desc' }, { name: 'asc' }]
    })
  },

  async getById(id: number, options: RestaurantIncludeOptions = {}) {
    const { includeMeals = false, includeReservations = false } = options

    return prisma.restaurant.findUnique({
      where: { id },
      include: {
        meals: includeMeals
          ? {
              include: { meal: true }
            }
          : undefined,
        reservations: includeReservations ? true : undefined
      }
    })
  },

  async getByCuisine(cuisine: string) {
    return prisma.restaurant.findMany({
      where: {
  cuisine: { contains: cuisine }
      },
      orderBy: [{ rating: 'desc' }, { name: 'asc' }]
    })
  }
}

// Menu utilities mapped to Restaurant_Meals join table
export const menuUtils = {
  async getMenuByRestaurant(restaurantId: number) {
    return prisma.restaurant_Meals.findMany({
      where: { restaurantId },
      include: { meal: true },
      orderBy: [{ meal: { type: 'asc' } }, { meal: { title: 'asc' } }]
    })
  },

  async search(query: string, restaurantId?: number) {
    const where: Prisma.MealWhereInput = {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } }
      ]
    }

    if (restaurantId !== undefined) {
      where.restaurants = { some: { restaurantId } }
    }

    return prisma.meal.findMany({
      where,
      include: {
        restaurants: {
          include: { restaurant: true }
        }
      },
      orderBy: [{ type: 'asc' }, { title: 'asc' }]
    })
  }
}

// Reservation utilities
export const reservationUtils = {
  async create(payload: CreateReservationRequest & { totalAmount?: number; status?: string }) {
    const { date, restaurantId, totalAmount, status, ...rest } = payload

    return prisma.reservation.create({
      data: {
        ...rest,
        restaurantId,
        date: new Date(date),
        status: status ?? undefined,
        totalAmount: totalAmount !== undefined ? new Prisma.Decimal(totalAmount) : undefined
      },
      include: {
        restaurant: true
      }
    })
  },

  async update(id: string, payload: UpdateReservationRequest) {
    const { date, totalAmount, ...rest } = payload

    return prisma.reservation.update({
      where: { id },
      data: {
        ...rest,
        date: date ? new Date(date) : undefined,
        totalAmount: totalAmount !== undefined ? new Prisma.Decimal(totalAmount) : undefined
      },
      include: {
        restaurant: true
      }
    })
  },

  async listByRestaurant(restaurantId: number, range?: { start: Date; end: Date }) {
    return prisma.reservation.findMany({
      where: {
        restaurantId,
        ...(range
          ? {
              date: {
                gte: range.start,
                lte: range.end
              }
            }
          : {})
      },
      orderBy: [{ date: 'asc' }, { time: 'asc' }]
    })
  }
}

// Cart utilities aligned with single Cart table
export const cartUtils = {
  async list(identifier: { sessionId?: string; userId?: string }) {
    if (!identifier.sessionId && !identifier.userId) {
      throw new Error('sessionId or userId is required')
    }

    return prisma.cart.findMany({
      where: {
        ...(identifier.sessionId ? { sessionId: identifier.sessionId } : {}),
        ...(identifier.userId ? { userId: identifier.userId } : {})
      },
      include: { meal: true },
      orderBy: [{ createdAt: 'desc' }]
    })
  },

  async upsertItem(payload: CreateCartRequest) {
    const {
      sessionId,
      mealId,
      userId,
      quantity = 1,
      childQuantity = 0,
      restaurantId,
      date
    } = payload

    const existing = await prisma.cart.findFirst({
      where: {
        sessionId,
        mealId,
        userId: userId ?? null,
        restaurantId: restaurantId ?? null,
        date: date ?? null
      }
    })

    if (existing) {
      return prisma.cart.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + quantity,
          childQuantity: existing.childQuantity + childQuantity,
          restaurantId: restaurantId ?? existing.restaurantId ?? null,
          date: date ?? existing.date ?? null
        },
        include: { meal: true }
      })
    }

    return prisma.cart.create({
      data: {
        sessionId,
        mealId,
        userId,
        quantity,
        childQuantity,
        restaurantId: restaurantId ?? null,
        date: date ?? null
      },
      include: { meal: true }
    })
  },

  async updateItem(id: string, payload: UpdateCartRequest) {
    const data: Prisma.CartUpdateInput = {}

    if (payload.quantity !== undefined) {
      data.quantity = payload.quantity
    }

    if (payload.childQuantity !== undefined) {
      data.childQuantity = payload.childQuantity
    }

    if (payload.restaurantId !== undefined) {
      data.restaurantId = payload.restaurantId
    }

    if (payload.date !== undefined) {
      data.date = payload.date
    }

    if (payload.userId !== undefined) {
      data.userId = payload.userId
    }

    return prisma.cart.update({
      where: { id },
      data,
      include: { meal: true }
    })
  },

  async remove(id: string) {
    return prisma.cart.delete({
      where: { id }
    })
  },

  async clear(identifier: { sessionId?: string; userId?: string }) {
    if (!identifier.sessionId && !identifier.userId) {
      throw new Error('sessionId or userId is required')
    }

    return prisma.cart.deleteMany({
      where: {
        ...(identifier.sessionId ? { sessionId: identifier.sessionId } : {}),
        ...(identifier.userId ? { userId: identifier.userId } : {})
      }
    })
  }
}