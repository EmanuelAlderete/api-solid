import { randomUUID } from "node:crypto";
import dayjs from "dayjs";
import type { CheckIn, Prisma } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins.repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public memory_database: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkinOnSameDate = this.memory_database.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkinOnSameDate) {
      return null;
    }

    return checkinOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.memory_database.push(checkin);

    return checkin;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.memory_database
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  countByUserId(userId: string) {
    return this.memory_database.filter((item) => item.user_id === userId)
      .length;
  }

  async findById(id: string) {
    const checkIn = this.memory_database.find((item) => item.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.memory_database.findIndex(
      (item) => item.id === checkIn.id
    );

    if (checkInIndex >= 0) {
      this.memory_database[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
