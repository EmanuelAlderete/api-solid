import type { Gym } from "@prisma/client";
import type { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymServiceRequest {
  title: string;
  description: string | null;
  phone: string;
  longitude: number;
  latitude: number;
}

interface CreateGymServiceResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
