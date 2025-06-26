import fastify from 'fastify'
import { PrismaClient } from '../generated/prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
	data: {
		name: 'Emanuel Alderete',
		email: 'justmyemail@gmail.com',
	},
})
