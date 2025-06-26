import type { FastifyInstance } from 'fastify'
import { userRegister } from './controllers/register.controller'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', userRegister)
}
