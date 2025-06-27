import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserRegisterService } from '../register.service'

export function makeRegisterService() {
	const usersRepository = new PrismaUsersRepository()
	const registerService = new UserRegisterService(usersRepository)

	return registerService
}
