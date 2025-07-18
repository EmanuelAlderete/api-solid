import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthService } from './auth.service'

let usersRepository: InMemoryUsersRepository
let sut: AuthService

describe('Authentication Service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
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
		await expect(() =>
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

		await expect(() =>
			sut.execute({
				email: 'johntester@gmail.com',
				password: 'wrongpassword',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
