import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    const resource = await prisma.resource.create({
      data: {
        title: data.title,
        titleAm: data.titleAm || null,
        description: data.description || null,
        descriptionAm: data.descriptionAm || null,
        type: data.type,
        fileUrl: data.fileUrl || null,
        videoUrl: data.videoUrl || null,
        audioUrl: data.audioUrl || null,
        content: data.content || null,
        contentAm: data.contentAm || null,
        thumbnail: data.thumbnail || null,
        category: data.category || null,
        tags: data.tags || [],
        authorId: session.user.id
      }
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create resource' },
      { status: 500 }
    )
  }
}

