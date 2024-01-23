import * as mongoose from 'mongoose';

export const ContainerSchema = new mongoose.Schema({
  id: String,
  names: [String],
  image: String,
  state: String,
});
