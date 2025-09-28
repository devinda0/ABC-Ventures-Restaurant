# Restaurant Management System

A modern restaurant management system built with Next.js, featuring online ordering, reservations, and payment processing.

## Features

- 🍽️ Restaurant listings and meal browsing
- 🛒 Shopping cart functionality
- 📅 Table reservations
- 💳 Stripe payment integration
- 📧 Contact form with email notifications
- 🗄️ MySQL database with Prisma ORM

## Prerequisites

Before running this application, make sure you have:

- [Docker](https://www.docker.com/get-started) and Docker Compose installed
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

## Quick Start with Docker (Recommended)

### 1. Clone the repository
```bash
git clone https://github.com/devinda0/ABC-Ventures-Restaurant
cd ABC-Ventures-Restaurant
```

### 2. Start the application
```bash
# Using Docker Compose
docker compose up --build -d

# Or using the Makefile
make start
```

### 3. Access the application
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Manual Setup (Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up the database
```bash
# Start MySQL with Docker
docker compose up mysql -d

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Access the application
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

### Database Management
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database and reseed

### Docker Management (using Makefile)
- `make start` - Start all services
- `make stop` - Stop all services
- `make restart` - Restart all services
- `make logs` - View application logs
- `make seed` - Seed the database
- `make cleanup` - Clean up Docker resources

## Database

The application uses MySQL 8.0 with the following default credentials:
- **Database**: `restaurant_db`
- **Username**: `restaurant_user`
- **Password**: `restaurant_password`
- **Port**: `3306`

## Environment Setup

Create a `.env.local` file in the root directory with your environment variables:
```env
DATABASE_URL="mysql://restaurant_user:restaurant_password@localhost:3306/restaurant_db"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
EMAIL_USER="your_email@example.com"
EMAIL_PASS="your_email_password"
```

## Project Structure

```
restaurant/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart pages
│   ├── checkout/          # Checkout and payment
│   └── restaurant/        # Restaurant pages
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── docker-compose.yml    # Docker services configuration
```

## Troubleshooting

### Database Connection Issues
1. Ensure MySQL container is running: `docker compose ps`
2. Check database logs: `docker compose logs mysql`
3. Reset the database: `npm run db:reset`

### Port Already in Use
If port 3000 or 3306 is already in use:
1. Stop conflicting services
2. Or modify ports in `docker-compose.yml`

### Container Issues
```bash
# Stop and remove all containers
docker compose down --volumes --remove-orphans

# Rebuild and restart
docker compose up --build -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
