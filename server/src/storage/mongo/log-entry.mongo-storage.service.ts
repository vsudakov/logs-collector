import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogEntryDocument } from './documents/log-entry.document';
import { LogEntry } from '../../logs/entities/log-entry.entity';
import { LogEntryStorageService } from '../log-entry.storage.service';
import { Container } from '../../logs/entities/container.entity';

@Injectable()
export class LogEntryMongoStorageService implements LogEntryStorageService {
  constructor(
    @InjectModel('LogEntry')
    private readonly logEntryModel: Model<LogEntryDocument>,
  ) {}

  async save(logEntry: LogEntry) {
    const doc = new this.logEntryModel(logEntry);
    return await doc.save();
  }

  getAll() {
    throw new Error('not implemented');
  }

  async findLast(container: Container): Promise<LogEntry | null> {
    return this.logEntryModel.findOne({ container }).sort({ _id: -1 });
  }

  removeAll(container: Container) {
    throw new Error('not implemented');
  }
}
