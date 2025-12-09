import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const slug = slugify(data.title)

    const news = await prisma.news.create({
      data: {
        title: data.title,
        titleAm: data.titleAm || null,
        slug,
        content: data.content,
        contentAm: data.contentAm || null,
        excerpt: data.excerpt || null,
        excerptAm: data.excerptAm || null,
        image: data.image || null,
        authorId: session.user.id,
        published: data.published || false,
        featured: data.featured || false,
        publishedAt: data.published ? new Date() : null
      }
    })

    return NextResponse.json({ news }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create news' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const news = await prisma.news.findMany({
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ news })
  } catch (error: any) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

