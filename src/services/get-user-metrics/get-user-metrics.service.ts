import type { CheckInsRepository } from "@/repositories/checkins.repository";

type GetUserMetricsServiceRequest = {
  userId: string;
};

type GetUserMetricsServiceResponse = {
  checkInsCount: number;
};

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
