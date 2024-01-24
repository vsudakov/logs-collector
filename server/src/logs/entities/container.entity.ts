import { Job } from './job.entity';

export interface Container {
  containerId: string;
  names: string[];
  image: string;
  job?: Job;
}
