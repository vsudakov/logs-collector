import * as mongoose from 'mongoose';
import { State } from '../../../collectors/entities/state';

export const CollectorSchema = new mongoose.Schema({
  state: {
    type: String,
    enum: Object.values(State),
    required: true,
  },
  container: { type: mongoose.Schema.Types.ObjectId, ref: 'Container' },
});
