import { update } from "./../../../node_modules/effect/src/Differ";
import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/checkins.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MaxDistanceError } from "../errors/max-distance-error";

type ValidateCheckInServiceRequest = {
  checkInId: string;
};

type ValidateCheckInServiceResponse = {
  checkIn: CheckIn;
};

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
