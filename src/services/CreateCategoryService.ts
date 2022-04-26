import { prismaClient } from '../database/prismaClient'
// import { CategoriesRepository } from '../repositories/CategoriesRepository'

interface IRequest {
  name: string
  description: string
}

export default class CreateCategoryService {
  async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name }
    })

    if (categoryAlreadyExists) {
      throw new Error('Categoria já existente!')
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        description
      }
    })

    return category
  }
}
