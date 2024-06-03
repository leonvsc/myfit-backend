export class CreateExerciseDTO {
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
