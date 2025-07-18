import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMeroryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileService } from './get-user-profile.service'

let usersRepository: InMeroryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
	beforeEach(() => {
		usersRepository = new InMeroryUsersRepository()
		sut = new GetUserProfileService(usersRepository)
	})

	it('should be able to get user profile', async () => {
		const createdUser = await usersRepository.create({
			name: 'John Tester',
			email: 'johntester@gmail.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			userId: createdUser.id,
		})

		expect(user.id).toEqual(expect.any(String))
		expect(user.name).toEqual('John Tester')
	})

	it('should not be able to get user profile with wrong id', async () => {
		expect(() =>
			sut.execute({
				userId: 'non-existing-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
