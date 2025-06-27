import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InMeroryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthService } from './auth.service'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authentication Service', () => {
	it('should be able to authenticate', async () => {
		const usersRepository = new InMeroryUsersRepository()
		const sut = new AuthService(usersRepository)

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
		const usersRepository = new InMeroryUsersRepository()
		const sut = new AuthService(usersRepository)

		expect(() =>
			sut.execute({
				email: 'johntestser@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		const usersRepository = new InMeroryUsersRepository()
		const sut = new AuthService(usersRepository)

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
