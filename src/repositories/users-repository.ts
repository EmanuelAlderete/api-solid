import type { Prisma, User } from 'generated/prisma'

export interface UsersRepository {
	findbyId(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	create(data: Prisma.UserCreateInput): Promise<User>
}
