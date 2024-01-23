import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { State } from '../../logs/entities/job.entity';
import { ContainerDocument } from './documents/container.document';
import { Container } from '../../logs/entities/container.entity';
import { ContainerStorageService } from '../container.storage.service';

@Injectable()
export class ContainerMongoStorageService implements ContainerStorageService {
  constructor(
    @InjectModel('Container')
    private readonly containerModel: Model<ContainerDocument>,
  ) {}

  async upsert(container: Container) {
    return this.containerModel.findOneAndUpdate(
      {
        containerId: container.containerId,
      },
      container,
      {
        new: true,
        upsert: true,
      },
    );
  }

  async findOne(containerId: string) {
    return this.containerModel.findOne({ containerId });
  }

  async updateState(containerId: string, state: State) {
    return this.containerModel.findOneAndUpdate(
      { containerId },
      { state },
      { new: true },
    );
  }
}
