import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type AdminSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json({ success: true })
    const session = await getIronSession<AdminSession>(req, res, sessionOptions)
    
    // Détruire la session
    session.destroy()
    
    return res
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
