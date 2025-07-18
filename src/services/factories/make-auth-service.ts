import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthService } from '../auth/auth.service'

export function makeAuthService() {
	const prismaUsersRepository = new PrismaUsersRepository()
	const authService = new AuthService(prismaUsersRepository)

	return authService
}
