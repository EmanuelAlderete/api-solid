import type { CheckIn } from 'generated/prisma'
import type { CheckInsRepository } from '@/repositories/checkins.repository'
import type { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
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
		userLatitude,
		userLongitude,
	}: CheckinServiceRequest): Promise<CheckinServiceResponse> {
		const gym = await this.gymsRepository.findbyId(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const MAX_DISTANCE_IN_KILOMETERS = 0.1

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		)

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new Error()
		}

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
