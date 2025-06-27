import type { FastifyInstance } from 'fastify'
import { auth } from './controllers/auth.controller'
import { userRegister } from './controllers/register.controller'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', userRegister)
	app.post('/sessions', auth)
}
