import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const encryptedPassword = await hash('adminadmin', 8)
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: encryptedPassword,
      role: {
        connectOrCreate: {
          where: {
            name: 'Administrador'
          },
          create: {
            name: 'Administrador',
            description: 'Administrador do sistema'
          }
        }
      },
      profile: {
        create: {}
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
