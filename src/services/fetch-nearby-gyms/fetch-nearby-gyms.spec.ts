import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memor-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms.service";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Ser", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "Presidente Vargas",
      phone: "53 999594444",
      latitude: -31.3244038,
      longitude: -54.1004903,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: "Presidente Vargas",
      phone: "53 999594444",
      latitude: -30.9778284,
      longitude: -54.6829532,
    });

    const { gyms } = await sut.execute({
      userLatitude: -31.3209199,
      userLongitude: -54.0999917,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
