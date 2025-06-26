import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InMeroryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'
import { UserRegisterService } from './register.service'

describe('User Registration Service', () => {
	it('should hash user password upon registration', async () => {
		const usersRepository = new InMeroryUsersRepository()
		const userRegisterService = new UserRegisterService(usersRepository)

		const { user } = await userRegisterService.execute({
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
})
