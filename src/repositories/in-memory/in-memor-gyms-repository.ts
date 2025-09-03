import { randomUUID } from "node:crypto";
import { type Gym, Prisma } from "generated/prisma";
import type { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public memory_database: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.memory_database.push(gym);

    return gym;
  }

  async findbyId(id: string): Promise<Gym | null> {
    const gym = this.memory_database.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
