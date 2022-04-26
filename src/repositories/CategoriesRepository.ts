import { prismaClient } from '../database/prismaClient'

export class CategoriesRepository {
  async findByName(name: string) {
    const findCategory = await prismaClient.category.findFirst({
      where: { name }
    })

    return findCategory || null
  }
}
