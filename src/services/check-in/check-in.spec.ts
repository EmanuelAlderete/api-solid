import { Decimal } from "generated/prisma/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memor-gyms-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory.checkins-repository";
import { CheckInService } from "./check-in.service";
import { MaxDistanceError } from "../errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "../errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("User Registration Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Academia dos Ratos",
      description: null,
      phone: null,
      latitude: -31.3233199,
      longitude: -54.0901376,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.3233199,
      userLongitude: -54.0901376,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.3233199,
      userLongitude: -54.0901376,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -31.3233199,
        userLongitude: -54.0901376,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice, but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.3233199,
      userLongitude: -54.0901376,
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.3233199,
      userLongitude: -54.0901376,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.memory_database.push({
      id: "gym-02",
      title: "Academia dos Ratos",
      description: null,
      phone: null,
      latitude: new Decimal(-31.2866554),
      longitude: new Decimal(-54.0692621),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -31.3233199,
        userLongitude: -54.0901376,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
