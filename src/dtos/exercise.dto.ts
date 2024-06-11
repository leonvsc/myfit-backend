import { IsString } from 'class-validator';

export class CreateExerciseDTO {
  @IsString()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class UpdateExerciseDTO {
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }
}
