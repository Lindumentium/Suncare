import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, unitNumber, emergencyContact, dietaryRequirements, medicalConditions, mobility } = body

    const newResident = await prisma.resident.create({
      data: {
        name,
        unitNumber,
        emergencyContact,
        dietaryRequirements: dietaryRequirements.split(',').map((item: string) => item.trim()),
        medicalConditions: medicalConditions.split(',').map((item: string) => item.trim()),
        mobility,
      },
    })

    return NextResponse.json(newResident, { status: 201 })
  } catch (error) {
    console.error('Failed to create new resident:', error)
    return NextResponse.json({ error: 'Failed to create new resident' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const unitNumber = searchParams.get('unitNumber')

  if (!unitNumber) {
    return NextResponse.json({ error: 'Unit number is required' }, { status: 400 })
  }

  try {
    const residents = await prisma.resident.findMany({
      where: {
        unitNumber: unitNumber,
      },
      select: {
        id: true,
        name: true,
        unitNumber: true,
      },
    })

    return NextResponse.json(residents)
  } catch (error) {
    console.error('Failed to fetch residents:', error)
    return NextResponse.json({ error: 'Failed to fetch residents' }, { status: 500 })
  }
}

