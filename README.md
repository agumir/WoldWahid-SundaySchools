# Sunday School Management & Media Website

A complete, production-ready Sunday School Management System for the Ethiopian Orthodox Tewahedo Church, built with Next.js 14, featuring bilingual support (Amharic & English) and an ultra-simple admin interface for HR/Teachers.

## Features

### Public Website
- **Home Page** with slider, featured news, quick links
- **News & Announcements** (list + single page)
- **Sunday School Resources**:
  - Weekly Lessons
  - Spiritual Blogs
  - Video & Audio Teachings
  - PDF Library
- **Events Calendar** + Event Details
- **Student Portal** (login)
- **About Sunday School** & **About Ethiopian Orthodox Church**
- **Contact Page**
- **Language Toggle**: Amharic ⇄ English (i18n)

### Admin Dashboard (HR/Teacher Friendly)
- **Students Management**: Add, view, edit students with simple forms
- **Attendance Tracking**: Checkbox-based attendance marking
- **News Management**: Create/Update/Delete news with rich text editor
- **Resources Management**: Upload PDFs, add YouTube videos, audio files, blogs
- **Events Management**: Add/Edit events with dates and banners
- **Teachers Management**: Add teacher profiles
- **User Management**: Admin/Tutor/HR roles

### Additional Features
- **Bible Reading Plan** module
- **Quiz/Exam** module (MCQ with automatic scoring)
- **Digital Library** module
- **Teacher Assignments** module
- **Donation** page (optional)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Rich Text Editor**: React Quill

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Woldwahid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/sunday_school"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Or push schema directly (for development)
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The system includes the following main models:
- **User**: Authentication and user management
- **Student**: Student profiles and information
- **Teacher**: Teacher profiles
- **News**: News articles and announcements
- **Resource**: PDFs, videos, audio, lessons, blogs
- **Event**: Calendar events
- **Attendance**: Student attendance records
- **Quiz**: Quiz/Exam questions and results
- **Assignment**: Teacher assignments and submissions
- **BibleReadingPlan**: Daily reading plans
- **Donation**: Donation records

## User Roles

- **ADMIN**: Full system access
- **HR**: Student and attendance management
- **TEACHER**: Resource and assignment management
- **STUDENT**: Access to student portal

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Railway Deployment

1. Create a new Railway project
2. Add PostgreSQL service
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

### Docker Deployment

```bash
# Build the Docker image
docker build -t sunday-school .

# Run the container
docker run -p 3000:3000 --env-file .env sunday-school
```

## Project Structure

```
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── news/           # News pages
│   │   ├── resources/      # Resources pages
│   │   ├── events/         # Events pages
│   │   └── auth/           # Authentication
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/
│   ├── admin/              # Admin components
│   ├── home/               # Home page components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components (ShadCN)
├── lib/                    # Utilities and helpers
├── messages/               # i18n translation files
├── prisma/                 # Database schema
└── public/                 # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email info@sundayschool.et or open an issue in the repository.

## Acknowledgments

- Ethiopian Orthodox Tewahedo Church
- Next.js team
- ShadCN UI contributors

