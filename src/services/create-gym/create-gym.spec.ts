import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memor-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymService } from "./create-gym.service";

let usersRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(usersRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "ProFit",
      description: "Presidente Vargas",
      phone: "53 999594444",
      latitude: -31.3233199,
      longitude: -54.0901376,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
