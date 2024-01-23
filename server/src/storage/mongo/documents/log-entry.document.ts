import { Document } from 'mongoose';
import { LogEntry } from '../../../collectors/entities/log-entry.entity';
import { CollectorDocument } from './collector.document';

export interface LogEntryDocument extends LogEntry, Document {
  collector: CollectorDocument;
}
