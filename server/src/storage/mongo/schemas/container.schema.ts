import * as mongoose from 'mongoose';
import { State } from '../../../logs/entities/job.entity';

export const ContainerSchema = new mongoose.Schema({
  containerId: String,
  names: [String],
  image: String,
  state: String,
  job: {
    state: {
      type: String,
      enum: Object.values(State),
      required: true,
    },
  },
});
