import type { CheckIn } from 'generated/prisma'
import type { CheckInsRepository } from '@/repositories/checkins.repository'
import type { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type CheckinServiceRequest = {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

type CheckinServiceResponse = {
	checkIn: CheckIn
}

export class CheckInService {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository,
	) {}
	async execute({
		userId,
		gymId,
	}: CheckinServiceRequest): Promise<CheckinServiceResponse> {
		const gym = await this.gymsRepository.findbyId(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		// TODO - calculate distance between user and gym

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
