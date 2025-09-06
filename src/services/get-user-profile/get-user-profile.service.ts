import type { User } from '@prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type GetUSerProfileServiceRequest = {
	userId: string
}

type GetUSerProfileServiceResponse = {
	user: User
}

export class GetUserProfileService {
	constructor(private usersRepository: UsersRepository) {}
	async execute({
		userId,
	}: GetUSerProfileServiceRequest): Promise<GetUSerProfileServiceResponse> {
		const user = await this.usersRepository.findbyId(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		return {
			user,
		}
	}
}
