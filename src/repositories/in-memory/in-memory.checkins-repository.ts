import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import type { CheckIn, Prisma } from 'generated/prisma'
import type { CheckInsRepository } from '../checkins.repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
	public memory_database: CheckIn[] = []

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')

		const checkinOnSameDate = this.memory_database.find((checkIn) => {
			const checkInDate = dayjs(checkIn.created_at)
			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

			return checkIn.user_id === userId && isOnSameDate
		})

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
