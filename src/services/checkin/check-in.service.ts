import type { CheckIn } from 'generated/prisma'
import type { CheckInsRepository } from '@/repositories/checkins.repository'

type CheckinServiceRequest = {
	userId: string
	gymId: string
}

type CheckinServiceResponse = {
	checkIn: CheckIn
}

export class CheckInService {
	constructor(private checkInsRepository: CheckInsRepository) {}
	async execute({
		userId,
		gymId,
	}: CheckinServiceRequest): Promise<CheckinServiceResponse> {
		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSameDay) {
			throw new Error()
		}

		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		})

		return {
			checkIn,
		}
	}
}
