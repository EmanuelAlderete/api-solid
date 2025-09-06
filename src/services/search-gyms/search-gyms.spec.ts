import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memor-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymService } from "./search-gyms.service";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymService;

describe("Search Gyms Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymService(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JS Gym",
      description: "Presidente Vargas",
      phone: "53 999594444",
      latitude: -31.3233199,
      longitude: -54.0901376,
    });
    await gymsRepository.create({
      title: "TS Gym",
      description: "Presidente Vargas",
      phone: "53 999594444",
      latitude: -31.3233199,
      longitude: -54.0901376,
    });

    const { gyms } = await sut.execute({
      query: "JS",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "JS Gym" })]);
  });

  it("should be able to search paginated gyms", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym ${i}`,
        description: "Presidente Vargas",
        phone: "53 999594444",
        latitude: -31.3233199,
        longitude: -54.0901376,
      });
    }

    const { gyms } = await sut.execute({
      query: "JS",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JS Gym 21" }),
      expect.objectContaining({ title: "JS Gym 22" }),
    ]);
  });
});
