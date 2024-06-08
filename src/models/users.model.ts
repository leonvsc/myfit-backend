import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { workoutSchema } from '@models/workout.model';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  workouts: [
    {
      type: workoutSchema,
      required: false,
    },
  ],
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
