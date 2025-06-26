import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserRegisterService } from '@/services/register.service'

export async function userRegister(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(request.body)

	try {
		const prismaUsersRepository = new PrismaUsersRepository()
		const userRegisterService = new UserRegisterService(prismaUsersRepository)
		await userRegisterService.execute({
			name,
			email,
			password,
		})
	} catch (err) {
		return reply.status(409).send()
	}

	return reply.status(201).send()
}
