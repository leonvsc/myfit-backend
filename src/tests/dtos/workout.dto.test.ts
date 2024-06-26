import { WorkoutDTO } from '../../dtos/workout.dto';

describe('WorkoutDTO', () => {
  it('should create a WorkoutDTO object', () => {
    const workout = new WorkoutDTO('1', 60, []);

    expect(workout).toHaveProperty('_id', '1');
    expect(workout).toHaveProperty('totalTime', 60);
    expect(workout).toHaveProperty('exercises', []);
  });
});
