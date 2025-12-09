# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a PostgreSQL database and update the `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sunday_school"
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Or push schema directly (development)
npm run db:push
```

### 4. Set Up Authentication

Generate a secret for NextAuth:

```bash
openssl rand -base64 32
```

Add to `.env`:

```env
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Create First Admin User

You'll need to create the first admin user manually in the database. You can use Prisma Studio:

```bash
npm run db:studio
```

Or create a seed script to add an admin user.

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Creating First Admin User

### Option 1: Using Prisma Studio

1. Run `npm run db:studio`
2. Navigate to the User table
3. Create a new user with:
   - email: your-email@example.com
   - password: (hashed with bcrypt)
   - name: Your Name
   - role: ADMIN

### Option 2: Using a Seed Script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run: `npx tsx prisma/seed.ts`

## Docker Setup

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# Run migrations
docker-compose exec app npm run db:migrate

# Create admin user (see above)
```

## Production Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Railway

1. Create new project
2. Add PostgreSQL service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for JWT signing
- `NEXTAUTH_URL`: Application URL

Optional:
- `CLOUDINARY_CLOUD_NAME`: For image uploads
- `CLOUDINARY_API_KEY`: For image uploads
- `CLOUDINARY_API_SECRET`: For image uploads

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### Authentication Issues

- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

### Build Errors

- Run `npm run db:generate` before building
- Ensure all environment variables are set
- Check Node.js version (18+)

## Next Steps

1. Create admin user
2. Log in to admin dashboard
3. Add students
4. Create news articles
5. Upload resources
6. Set up events

## Support

For issues or questions, please open an issue in the repository.

