import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthService } from '@/services/auth.service'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
	const authBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { email, password } = authBodySchema.parse(request.body)

	try {
		const prismaUsersRepository = new PrismaUsersRepository()
		const authService = new AuthService(prismaUsersRepository)
		await authService.execute({
			email,
			password,
		})
	} catch (err) {
		if (err instanceof InvalidCredentialsError)
			return reply.status(400).send({ message: err.message })

		return reply.status(500).send() //TODO: fix me!
	}

	return reply.status(200).send()
}
