import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthService } from '@/services/factories/make-auth-service'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
	const authBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { email, password } = authBodySchema.parse(request.body)

	try {
		const authService = makeAuthService()
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
