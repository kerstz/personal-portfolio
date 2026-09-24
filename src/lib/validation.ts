import { z } from 'zod'
import { NextResponse } from 'next/server'

const MAX_TEXT = 20_000

const text = (max = MAX_TEXT) => z.string().max(max)
const httpUrl = z.url({ protocol: /^https?$/ }).max(2048)
const optionalUrl = z.union([httpUrl, z.literal(''), z.null()]).optional()
const i18n = (max = MAX_TEXT) => z.object({ fr: text(max).default(''), en: text(max).default('') })
const emptyI18n = { fr: '', en: '' }
// Prisma refuse `null` sur un champ Json optionnel : on le convertit en undefined
const optionalJson = <T extends z.ZodType>(schema: T) => schema.nullish().transform((v) => v ?? undefined)

export const loginSchema = z.object({
  email: z.string().min(1).max(254),
  password: z.string().min(1).max(256),
})

export const projectSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: i18n(300),
  summary: i18n(2000).nullish().transform((v) => v ?? emptyI18n),
  description: optionalJson(i18n()),
  content: optionalJson(i18n()),
  // Le formulaire d'édition envoie une chaîne "a, b, c" ; la création envoie un tableau
  stack: z.preprocess(
    (v) => (typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : v),
    z.array(text(100)).max(50).default([])
  ),
  role: text(200).nullish(),
  links: optionalJson(z.object({ repo: optionalUrl, demo: optionalUrl })),
  images: optionalJson(z.array(z.object({ src: httpUrl, alt: i18n(300).optional() })).max(20)),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']).default('IN_PROGRESS'),
})

export const testimonialSchema = z.object({
  author: z.string().min(1).max(200),
  role: text(200).nullish(),
  company: text(200).nullish(),
  quote: i18n(5000),
  photoUrl: optionalUrl,
  links: optionalJson(z.object({ linkedin: optionalUrl, github: optionalUrl })),
})

export const siteSchema = z.object({
  heroTitle: optionalJson(i18n(300)),
  heroSubtitle: optionalJson(i18n(300)),
  heroDescription: optionalJson(i18n(5000)),
  aboutTitle: optionalJson(i18n(300)),
  aboutContent: optionalJson(i18n()),
  manifestoTitle: optionalJson(i18n(300)),
  manifestoContent: optionalJson(i18n()),
  contactEmail: z.union([z.email().max(254), z.literal(''), z.null()]).optional(),
})

export const pgpSchema = z.object({
  publicKey: text(50_000).nullish(),
  fingerprint: text(128).nullish(),
  keyId: text(64).nullish(),
  algorithm: text(64).nullish(),
  expiresAt: z.union([z.literal(''), z.null(), z.coerce.date()]).optional(),
})

export const idSchema = z.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/)

// Parse le corps JSON et le valide ; retourne soit les données, soit une réponse 400
export async function parseBody<T extends z.ZodType>(req: Request, schema: T) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return { ok: false as const, response: NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  }
  const result = schema.safeParse(json)
  if (!result.success) {
    return { ok: false as const, response: NextResponse.json({ error: 'Invalid payload' }, { status: 400 }) }
  }
  return { ok: true as const, data: result.data as z.infer<T> }
}
