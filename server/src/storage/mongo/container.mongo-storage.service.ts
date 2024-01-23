import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContainerDocument } from './documents/container.document';
import { Container } from '../../collectors/entities/container.entity';
import { ContainerStorageService } from '../container.storage.service';

@Injectable()
export class ContainerMongoStorageService implements ContainerStorageService {
  constructor(
    @InjectModel('Container')
    private readonly containerModel: Model<ContainerDocument>,
  ) {}

  async createIfNotExists(container: Container) {
    const existing = this.findOne(container.containerId);
    if (existing) return existing;

    const newContainer = new this.containerModel(container);
    return await newContainer.save();
  }

  async findOne(containerId: string): Promise<Container | null> {
    return await this.containerModel.findOne({ containerId }).exec();
  }
}
