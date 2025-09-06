import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

type AuthServiceRequest = {
	email: string
	password: string
}

type AuthServiceResponse = {
	user: User
}

export class AuthService {
	constructor(private usersRepository: UsersRepository) {}
	async execute({
		email,
		password,
	}: AuthServiceRequest): Promise<AuthServiceResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, user.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}
	}
}
