import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
	findbyId(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	create(data: Prisma.UserCreateInput): Promise<User>
}
