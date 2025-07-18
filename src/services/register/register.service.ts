import { hash } from 'bcryptjs'
import type { User } from 'generated/prisma'
import type { UsersRepository } from '@/repositories/users-repository'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered-error'

interface UserRegisterRequest {
	name: string
	email: string
	password: string
}

interface UserRegisterServiceResponse {
	user: User
}

export class UserRegisterService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: UserRegisterRequest): Promise<UserRegisterServiceResponse> {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new EmailAlreadyRegisteredError()
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		})

		return { user }
	}
}
