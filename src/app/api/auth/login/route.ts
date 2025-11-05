import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { getIronSession } from 'iron-session'
import { sessionOptions, type AdminSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    // Chercher l'utilisateur admin
    const admin = await prisma.adminUser.findUnique({
      where: { email }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      )
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, admin.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      )
    }

    // Créer la session
    const res = NextResponse.json({ success: true })
    const session = await getIronSession<AdminSession>(req, res, sessionOptions)
    
    session.admin = {
      id: admin.id,
      email: admin.email
    }
    
    await session.save()

    return res
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
