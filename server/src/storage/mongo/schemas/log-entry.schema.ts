import mongoose from 'mongoose';

export const LogEntrySchema = new mongoose.Schema({
  text: String,
  collector: { type: mongoose.Schema.Types.ObjectId, ref: 'Collector' },
});
