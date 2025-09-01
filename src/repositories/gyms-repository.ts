import type { Gym, Prisma } from 'generated/prisma'

export interface GymsRepository {
	create(data: Prisma.GymCreateInput): Promise<Gym>
	findbyId(id: string): Promise<Gym | null>
}
