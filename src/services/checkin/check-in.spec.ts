import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory.checkins-repository'
import { CheckinService } from './check-in.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckinService

describe('User Registration Service', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckinService(checkInsRepository)
	})

	it('should be able to check in', async () => {
		const { checkin } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		expect(checkin.id).toEqual(expect.any(String))
	})
})
