import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyRegisteredError } from '@/services/errors/email-already-registered-error'
import { makeRegisterService } from '@/services/factories/make-register-service'

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
		const userRegisterService = makeRegisterService()
		await userRegisterService.execute({
			name,
			email,
			password,
		})
	} catch (err) {
		if (err instanceof EmailAlreadyRegisteredError)
			return reply.status(409).send({ message: err.message })

		return reply.status(500).send() //TODO: fix me!
	}

	return reply.status(201).send()
}
