import { Document } from 'mongoose';
import { LogEntry } from '../../../logs/entities/log-entry.entity';
import { ContainerDocument } from './container.document';

export interface LogEntryDocument extends LogEntry, Document {
  container: ContainerDocument;
}
