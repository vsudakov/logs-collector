import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogEntryDocument } from './documents/log-entry.document';
import { LogEntry } from '../../collectors/entities/log-entry.entity';
import { LogEntryStorageService } from '../log-entry.storage.service';

@Injectable()
export class LogEntryMongoStorageService implements LogEntryStorageService {
  constructor(
    @InjectModel('LogEntry')
    private readonly messageModel: Model<LogEntryDocument>,
  ) {}

  async save(logEntry: LogEntry) {
    const doc = new this.messageModel(logEntry);
    return await doc.save();
  }

  findAll() {
    throw new Error('not implemented');
  }

  findLast(): LogEntry {
    throw new Error('not implemented');
  }

  removeAll(collectorId: string) {
    throw new Error('not implemented');
  }
}
