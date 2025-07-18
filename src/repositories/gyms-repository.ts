import type { Gym } from 'generated/prisma'

export interface GymsRepository {
	findbyId(id: string): Promise<Gym | null>
}
