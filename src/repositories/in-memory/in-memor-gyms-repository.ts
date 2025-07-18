import type { Gym } from 'generated/prisma'
import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
	public memory_database: Gym[] = []

	async findbyId(id: string): Promise<Gym | null> {
		const gym = this.memory_database.find((item) => item.id === id)

		if (!gym) {
			return null
		}

		return gym
	}
}
