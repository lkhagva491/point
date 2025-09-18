# Point Monorepo

A modern full-stack web application built with NestJS, NextJS, and MongoDB.

## 🚀 Features

- **Backend**: NestJS with MongoDB integration
- **Admin Panel**: NextJS admin interface
- **User Interface**: NextJS user-facing application
- **Authentication**: JWT-based authentication with role-based access
- **Database**: MongoDB Atlas (online)
- **UI**: Tailwind CSS with responsive design
- **TypeScript**: Full TypeScript support across all applications
- **Monorepo**: Workspace-based monorepo structure

## 📁 Project Structure

```
├── apps/
│   ├── backend/          # NestJS API server
│   ├── admin-web/        # NextJS admin panel
│   └── user-web/         # NextJS user interface
├── packages/
│   ├── shared/           # Shared utilities and types
│   └── ui/               # Shared UI components
└── package.json          # Root package.json with workspace config
```

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Swagger** - API documentation
- **TypeScript** - Type-safe JavaScript

### Frontend
- **NextJS** - React framework for production
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **TypeScript** - Type-safe JavaScript

### Development
- **Monorepo** - Workspace-based project structure
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas account

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd point
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
- **Backend API**: http://localhost:3001
- **Admin Web**: http://localhost:3002
- **User Web**: http://localhost:3003

## 📚 API Documentation

Once the backend is running, access the Swagger API documentation at:
**http://localhost:3001/api/docs**

## 🔐 Authentication

The application uses JWT-based authentication with role-based access control:

- **Admin Role**: Full access to admin panel and user management
- **User Role**: Access to user dashboard and basic features

### Creating an Admin User

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

## 🎯 Available Scripts

### Root Level
- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications
- `npm run start` - Start all applications in production mode
- `npm run lint` - Lint all applications
- `npm run test` - Run tests for all applications

### Individual Applications
- `npm run dev:backend` - Start only backend
- `npm run dev:admin` - Start only admin web
- `npm run dev:user` - Start only user web
- `npm run build:backend` - Build only backend
- `npm run build:admin` - Build only admin web
- `npm run build:user` - Build only user web

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/point-db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3002,http://localhost:3003
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Point
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🏗️ Development

### Adding New Features

1. **Backend**: Add new modules in `apps/backend/src/`
2. **Frontend**: Add new pages/components in respective apps
3. **Shared**: Add shared utilities in `packages/shared/`
4. **UI**: Add shared components in `packages/ui/`

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful commit messages
- Write tests for new features

## 🚀 Deployment

### Backend
- Deploy to platforms like Heroku, Railway, or AWS
- Set production environment variables
- Ensure MongoDB Atlas is accessible

### Frontend
- Deploy to Vercel, Netlify, or similar platforms
- Update API URLs for production
- Build and deploy static files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [Development Guide](DEVELOPMENT.md)
- Review the API documentation at `/api/docs`
- Open an issue for bugs or feature requests