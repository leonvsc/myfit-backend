// src/dto/set.dto.ts
export class CreateSetDTO {
  reps: number;
  weight: number;
  performedExercizeId: string;

  constructor(reps: number, weight: number, performedExercizeId: string) {
    this.reps = reps;
    this.weight = weight;
    this.performedExercizeId = performedExercizeId;
  }
}

export class UpdateSetDTO {
  reps?: number;
  weight?: number;

  constructor(reps?: number, weight?: number) {
    this.reps = reps;
    this.weight = weight;
  }
}
