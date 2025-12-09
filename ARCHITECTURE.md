# System Architecture

## Overview

The Sunday School Management System is built using Next.js 14 with the App Router, providing a modern, scalable architecture for managing Sunday School operations.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Public Pages │  │ Admin Pages  │  │  API Routes  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  NextAuth.js │ │   Prisma     │ │   next-intl  │
│ (Auth)       │ │   (ORM)      │ │   (i18n)     │
└──────────────┘ └──────────────┘ └──────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                         │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
sunday-school-management/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx         # Layout with i18n
│   │   ├── news/              # News pages
│   │   ├── resources/         # Resources pages
│   │   ├── events/            # Events pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── auth/              # Authentication
│   │   └── admin/             # Admin dashboard
│   │       ├── students/      # Student management
│   │       ├── teachers/      # Teacher management
│   │       ├── news/          # News management
│   │       ├── resources/     # Resource management
│   │       ├── events/         # Event management
│   │       ├── attendance/    # Attendance tracking
│   │       ├── quiz/          # Quiz management
│   │       ├── bible/         # Bible reading plans
│   │       └── users/         # User management
│   ├── api/                   # API routes
│   │   ├── auth/              # NextAuth endpoints
│   │   └── admin/             # Admin API endpoints
│   └── globals.css            # Global styles
├── components/
│   ├── admin/                 # Admin components
│   ├── home/                   # Home page components
│   ├── layout/                 # Layout components
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── auth.ts                # NextAuth configuration
│   ├── db.ts                  # Prisma client
│   └── utils.ts               # Utility functions
├── messages/                   # i18n translation files
│   ├── en.json
│   └── am.json
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                     # Static assets
```

## Data Flow

### Public Pages Flow

1. User visits a public page (e.g., `/en/news`)
2. Next.js renders the page with locale context
3. Server component fetches data from Prisma
4. Data is rendered with translations from `messages/[locale].json`
5. Client components handle interactivity

### Admin Dashboard Flow

1. User attempts to access `/admin`
2. Middleware checks authentication via NextAuth
3. If authenticated, user role is verified
4. Admin layout renders with sidebar navigation
5. Server components fetch data based on user role
6. Large, simple UI components display data for HR/Teachers

### API Routes Flow

1. Client makes request to `/api/admin/*`
2. Route handler checks authentication
3. Validates user role permissions
4. Performs database operation via Prisma
5. Returns JSON response

## Database Schema

### Core Models

- **User**: Authentication and basic user info
- **Student**: Extended student information
- **Teacher**: Extended teacher information
- **News**: News articles and announcements
- **Resource**: PDFs, videos, audio, lessons, blogs
- **Event**: Calendar events
- **Attendance**: Daily attendance records
- **Quiz**: Quiz/exam definitions
- **QuizResult**: Student quiz submissions
- **Assignment**: Teacher assignments
- **AssignmentSubmission**: Student submissions
- **BibleReadingPlan**: Daily reading plans
- **Donation**: Donation records

### Relationships

```
User 1:1 Student
User 1:1 Teacher
User 1:N News (author)
User 1:N Resource (author)
Student 1:N Attendance
Student 1:N QuizResult
Student 1:N AssignmentSubmission
Teacher 1:N Assignment
Quiz 1:N QuizResult
Assignment 1:N AssignmentSubmission
```

## Authentication & Authorization

### Roles

- **ADMIN**: Full system access
- **HR**: Student and attendance management
- **TEACHER**: Resource and assignment management
- **STUDENT**: Read-only access to student portal

### Authentication Flow

1. User submits credentials
2. NextAuth validates against database
3. Session created with JWT
4. Role stored in session token
5. Middleware checks role for protected routes

## Internationalization (i18n)

### Implementation

- Uses `next-intl` for translations
- Supports English (`en`) and Amharic (`am`)
- Locale stored in URL path (`/en/*` or `/am/*`)
- Translations in `messages/[locale].json`
- RTL support for Amharic

### Translation Structure

```json
{
  "common": { ... },
  "nav": { ... },
  "home": { ... },
  "admin": { ... },
  ...
}
```

## UI/UX Design Principles

### Admin Dashboard (HR/Teacher Friendly)

1. **Large Buttons**: Minimum 48px height, clear labels
2. **Simple Forms**: Step-by-step with helper text
3. **Visual Feedback**: Loading states, success/error messages
4. **Error Prevention**: Validation, confirmation dialogs
5. **Consistent Layout**: Sidebar navigation, card-based content

### Public Website

1. **Clean Design**: Church-appropriate, professional
2. **Responsive**: Mobile-first approach
3. **Accessible**: WCAG 2.1 AA compliance
4. **Fast Loading**: Optimized images, code splitting

## Security Considerations

1. **Authentication**: NextAuth.js with secure sessions
2. **Authorization**: Role-based access control
3. **Input Validation**: Zod schemas for API routes
4. **SQL Injection**: Prisma ORM prevents SQL injection
5. **XSS Protection**: React's built-in escaping
6. **CSRF Protection**: NextAuth.js handles CSRF tokens

## Performance Optimizations

1. **Server Components**: Default in App Router
2. **Image Optimization**: Next.js Image component
3. **Code Splitting**: Automatic with App Router
4. **Caching**: Next.js built-in caching strategies
5. **Database Indexing**: Prisma schema includes indexes

## Deployment Architecture

### Production Setup

```
┌─────────────────┐
│   CDN/Vercel     │
│   (Edge)        │
└────────┬────────┘
         │
┌────────▼────────┐
│  Next.js App    │
│  (Server)       │
└────────┬────────┘
         │
┌────────▼────────┐
│  PostgreSQL     │
│  (Database)     │
└─────────────────┘
```

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for JWT signing
- `NEXTAUTH_URL`: Application URL

## Scalability Considerations

1. **Database**: PostgreSQL can scale horizontally with read replicas
2. **Application**: Stateless, can scale horizontally
3. **Caching**: Redis for session storage (optional)
4. **CDN**: Static assets served from CDN
5. **File Storage**: Cloud storage for uploads (Cloudinary, S3)

## Future Enhancements

1. Real-time notifications
2. Mobile app (React Native)
3. Advanced analytics
4. Email notifications
5. SMS integration
6. Payment gateway integration
7. Video streaming platform
8. Advanced reporting

