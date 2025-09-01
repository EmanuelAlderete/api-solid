import type { CheckIn } from 'generated/prisma'
import type { CheckInsRepository } from '@/repositories/checkins.repository'

type FetchUserCheckInsHistoryServiceRequest = {
	userId: string
	page: number
}

type FetchUserCheckInsHistoryServiceResponse = {
	checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
	constructor(
		private checkInsRepository: CheckInsRepository,
	) {}
	async execute({
		userId,
		page,
	}: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {

		const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

		return {
			checkIns
		}
	}
}
