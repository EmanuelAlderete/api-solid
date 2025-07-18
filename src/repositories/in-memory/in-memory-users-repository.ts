import type { Prisma, User } from 'generated/prisma'
import type { UsersRepository } from '../users-repository'

export class InMeroryUsersRepository implements UsersRepository {
	public memory_database: User[] = []

	async findbyId(id: string): Promise<User | null> {
		const user = this.memory_database.find((item) => item.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.memory_database.find((item) => item.email === email)

		if (!user) {
			return null
		}

		return user
	}
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: 'user-1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		}

		this.memory_database.push(user)

		return user
	}
}
