import mongoose from 'mongoose';

export const LogEntrySchema = new mongoose.Schema({
  timestamp: String,
  text: String,
  container: { type: mongoose.Schema.Types.ObjectId, ref: 'Container' },
});
