import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const encryptedPassword = await hash('@dmin_m3us_T1ckets#', 8)
  await prisma.user.create({
    data: {
      email: 'admin@meustickets.com',
      password: encryptedPassword,
      role: 'Administrador',
      profile: {
        create: {
          name: 'Administrador'
        }
      }
    }
  })

  const encryptedSellerPassword = await hash('#v3nD_3dor/', 8)
  await prisma.user.create({
    data: {
      email: 'vendedor@meustickets.com',
      password: encryptedSellerPassword,
      role: 'Vendedor',
      profile: {
        create: {
          name: 'Vendedor'
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
