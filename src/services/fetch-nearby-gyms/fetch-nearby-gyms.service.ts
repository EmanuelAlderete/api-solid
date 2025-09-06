import type { Gym } from "@prisma/client";
import type { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsServiceResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
