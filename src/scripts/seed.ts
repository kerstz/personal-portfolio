import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'change-this-password';
  const passwordHash = await bcrypt.hash(password, 12);

  // Upsert admin user
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
    },
  });

  // Ensure a SiteContent exists with default content
  await prisma.siteContent.upsert({
    where: { id: 'site-singleton' },
    update: {},
    create: {
      id: 'site-singleton',
      heroTitle: { 
        fr: 'Your Name', 
        en: 'Your Name' 
      } as any,
      heroSubtitle: { 
        fr: 'Développeur Full-Stack & Expert en Cybersécurité', 
        en: 'Full-Stack Developer & Cybersecurity Expert' 
      } as any,
      heroDescription: { 
        fr: 'Passionné par l\'innovation technologique et la protection des données. Je crée des solutions robustes et sécurisées qui respectent la vie privée des utilisateurs.',
        en: 'Passionate about technological innovation and data protection. I create robust and secure solutions that respect user privacy.'
      } as any,
      aboutTitle: { 
        fr: 'À propos', 
        en: 'About' 
      } as any,
      aboutContent: { 
        fr: 'Développeur passionné avec plus de 5 ans d\'expérience dans le développement d\'applications web modernes. Je me spécialise dans les technologies React, Next.js et Node.js, avec un fort intérêt pour la cybersécurité et la protection de la vie privée.\n\nAdepte du mouvement cypherpunk, je crois fermement en l\'importance de la cryptographie et des outils de protection de la vie privée pour préserver nos libertés numériques.',
        en: 'Passionate developer with over 5 years of experience in modern web application development. I specialize in React, Next.js and Node.js technologies, with a strong interest in cybersecurity and privacy protection.\n\nAs a cypherpunk movement advocate, I firmly believe in the importance of cryptography and privacy protection tools to preserve our digital freedoms.'
      } as any,
      manifestoTitle: { 
        fr: 'Manifeste', 
        en: 'Manifesto' 
      } as any,
      manifestoContent: { 
        fr: 'La technologie doit servir l\'humanité, pas l\'asservir. Je développe des solutions qui placent la vie privée et la sécurité au cœur de chaque projet, en m\'inspirant des valeurs cypherpunk de liberté numérique et de résistance à la surveillance de masse.',
        en: 'Technology must serve humanity, not enslave it. I develop solutions that place privacy and security at the heart of every project, inspired by cypherpunk values of digital freedom and resistance to mass surveillance.'
      } as any,
      contactEmail: 'contact@example.com',
      theme: { default: 'professional', crtEnabled: false } as any,
    },
  });

  console.log('Seed completed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});




