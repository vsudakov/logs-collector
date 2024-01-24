import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { State } from '../../logs/entities/job.entity';
import { ContainerDocument } from './documents/container.document';
import { Container } from '../../logs/entities/container.entity';
import { ContainerStorageService } from '../container.storage.service';
import { SearchContainersDto } from '../../logs/dto/search-containers.dto';

@Injectable()
export class ContainerMongoStorageService implements ContainerStorageService {
  constructor(
    @InjectModel('Container')
    private readonly containerModel: Model<ContainerDocument>,
  ) {}

  async upsert(container: Container) {
    const existing = this.containerModel.findOne({
      containerId: container.containerId,
    });

    if (existing) return existing;

    const doc = new this.containerModel(container);
    return await doc.save();
  }

  async getAll() {
    return this.containerModel.find().sort({ containerId: 1 });
  }

  async findByState(state: State) {
    return this.containerModel
      .find({ job: { state } })
      .sort({ containerId: 1 });
  }

  async search(searchCriteria: SearchContainersDto): Promise<Container[]> {
    const criteria = [];

    if (searchCriteria.id?.length) {
      criteria.push({
        containerId: { $in: searchCriteria.id },
      });
    }

    if (searchCriteria.name?.length) {
      criteria.push({
        names: { $in: searchCriteria.name },
      });
    }

    return this.containerModel.find(criteria);
  }

  async updateState(container: Container, state: State) {
    return this.containerModel.findOneAndUpdate(
      { containerId: container.containerId },
      { job: { state } },
      { new: true },
    );
  }

  async remove(container: Container) {
    this.containerModel.findOneAndDelete({
      containerId: container.containerId,
    });
  }
}
