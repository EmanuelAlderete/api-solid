import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMeroryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthService } from './auth.service'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMeroryUsersRepository
let sut: AuthService

describe('Authentication Service', () => {
	beforeEach(() => {
		usersRepository = new InMeroryUsersRepository()
		sut = new AuthService(usersRepository)
	})

	it('should be able to authenticate', async () => {
		await usersRepository.create({
			name: 'John Tester',
			email: 'johntester@gmail.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			email: 'johntester@gmail.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		expect(() =>
			sut.execute({
				email: 'johntestser@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await usersRepository.create({
			name: 'John Tester',
			email: 'johntester@gmail.com',
			password_hash: await hash('123456', 6),
		})

		expect(() =>
			sut.execute({
				email: 'johntester@gmail.com',
				password: 'wrongpassword',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
