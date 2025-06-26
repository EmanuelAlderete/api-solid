import fastify from 'fastify'
import { z } from 'zod'
import { register } from './http/controllers/register.controller'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', register)
