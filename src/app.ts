import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() })
	}

	if (env.NODE_ENV !== 'production') {
		console.log(error)
	} else {
		// TODO: here we should log to an external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})
