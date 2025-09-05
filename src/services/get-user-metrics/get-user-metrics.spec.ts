import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memor-gyms-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory.checkins-repository";
import { GetUserMetricsService } from "./get-user-metrics.service";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: GetUserMetricsService;

describe("Get User Metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({ userId: "user-01" });

    expect(checkInsCount).toEqual(2);
  });
});
