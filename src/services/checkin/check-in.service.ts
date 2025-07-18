import type { CheckIn } from 'generated/prisma'
import type { CheckInsRepository } from '@/repositories/checkins.repository'

type CheckinServiceRequest = {
	userId: string
	gymId: string
}

type CheckinServiceResponse = {
	checkin: CheckIn
}

export class CheckinService {
	constructor(private checkinsRepository: CheckInsRepository) {}
	async execute({
		userId,
		gymId,
	}: CheckinServiceRequest): Promise<CheckinServiceResponse> {
		const checkin = await this.checkinsRepository.create({
			gym_id: gymId,
			user_id: userId,
		})

		return {
			checkin,
		}
	}
}
