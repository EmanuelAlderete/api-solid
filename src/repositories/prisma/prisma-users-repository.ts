import type { Prisma, User } from 'generated/prisma/client'
import { prisma } from '@/lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
	async findByEmail(email: string) {
		const user = prisma.user.findUnique({
			where: { email },
		})

		return user
	}
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		})
		return user
	}
}
