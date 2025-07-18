import { randomUUID } from 'node:crypto'
import type { CheckIn, Prisma } from 'generated/prisma'
import type { CheckInsRepository } from '../checkins.repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
	public memory_database: CheckIn[] = []

	async findByUserIdOnDate(userId: string, date: Date) {
		const checkinOnSameDate = this.memory_database.find(
			(checkIn) => checkIn.user_id === userId,
		)

		if (!checkinOnSameDate) {
			return null
		}

		return checkinOnSameDate
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkin = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date(),
		}

		this.memory_database.push(checkin)

		return checkin
	}
}
