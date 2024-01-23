import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collector } from '../../collectors/entities/collector.entity';
import { CollectorDocument } from './documents/collector.document';
import { State } from '../../collectors/entities/state';
import { CollectorStorageService } from '../collector.storage.service';

@Injectable()
export class CollectorMongoStorageService implements CollectorStorageService {
  constructor(
    @InjectModel('Collector')
    private readonly collectorModel: Model<CollectorDocument>,
  ) {}

  async createIfNotExists(collector: Collector) {
    const existing = this.findOne(collector.container.containerId);
    if (existing) return existing;

    const newCollector = new this.collectorModel(collector);
    return await newCollector.save();
  }

  async findOne(containerId: string): Promise<Collector | null> {
    return await this.collectorModel
      .findOne({ container: { containerId } })
      .exec();
  }

  async updateState(id: string, state: State): Promise<Collector | null> {
    return await this.collectorModel
      .findByIdAndUpdate(id, { state }, { new: true })
      .exec();
  }
}
