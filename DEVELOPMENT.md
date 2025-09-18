# Development Setup Guide

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas account (for online MongoDB)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy environment files
   cp apps/backend/env.example apps/backend/.env
   cp apps/admin-web/env.example apps/admin-web/.env.local
   cp apps/user-web/env.example apps/user-web/.env.local
   ```

3. **Configure MongoDB:**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update `apps/backend/.env` with your MongoDB URI

4. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start all three applications:
- Backend API: http://localhost:3001
- Admin Web: http://localhost:3002
- User Web: http://localhost:3003

## Individual Commands

### Backend (NestJS)
```bash
npm run dev:backend    # Start backend in development mode
npm run build:backend  # Build backend
```

### Admin Web (NextJS)
```bash
npm run dev:admin      # Start admin web in development mode
npm run build:admin   # Build admin web
```

### User Web (NextJS)
```bash
npm run dev:user       # Start user web in development mode
npm run build:user    # Build user web
```

## Project Structure

```
├── apps/
│   ├── backend/          # NestJS API server
│   │   ├── src/
│   │   │   ├── auth/     # Authentication module
│   │   │   ├── users/    # Users module
│   │   │   └── main.ts   # Application entry point
│   │   └── package.json
│   ├── admin-web/        # NextJS admin panel
│   │   ├── src/
│   │   │   ├── pages/    # NextJS pages
│   │   │   ├── components/
│   │   │   └── styles/
│   │   └── package.json
│   └── user-web/         # NextJS user interface
│       ├── src/
│       │   ├── pages/    # NextJS pages
│       │   ├── components/
│       │   └── styles/
│       └── package.json
├── packages/
│   ├── shared/           # Shared utilities and types
│   └── ui/               # Shared UI components
└── package.json          # Root package.json with workspace config
```

## API Documentation

Once the backend is running, you can access the Swagger API documentation at:
http://localhost:3001/api/docs

## Default Admin User

To create an admin user, you can use the registration endpoint:

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/point-db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3002,http://localhost:3003
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Point
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Make sure ports 3001, 3002, and 3003 are available
   - You can change ports in the respective package.json files

2. **MongoDB connection issues:**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify your database credentials

3. **CORS issues:**
   - Make sure the CORS_ORIGIN in backend .env includes your frontend URLs

### Getting Help

- Check the console logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure all dependencies are installed with `npm install`
