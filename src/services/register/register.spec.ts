import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMeroryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered-error'
import { UserRegisterService } from './register.service'

let usersRepository: InMeroryUsersRepository
let sut: UserRegisterService

describe('User Registration Service', () => {
	beforeEach(() => {
		usersRepository = new InMeroryUsersRepository()
		sut = new UserRegisterService(usersRepository)
	})

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Tester',
			email: 'johntester@gmail.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with the same email twice', async () => {
		const email = 'johntester@gmail.com'

		await sut.execute({
			name: 'John Tester',
			email: email,
			password: '123456',
		})

		await expect(() =>
			sut.execute({
				name: 'John Tester',
				email: email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
	})

	it('should register a user', async () => {
		const { user } = await sut.execute({
			name: 'John Tester',
			email: 'johntester@gmail.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})
})
