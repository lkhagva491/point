// Types
export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  isActive: boolean
  point: number
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponse {
  access_token: string
  user: Omit<User, 'password'>
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  role?: string
}

// Validation schemas
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  isActive: z.boolean(),
  point: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const RegisterRequestSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
})

// Utility functions
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// Constants
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },
} as const
