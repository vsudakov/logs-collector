import { Document } from 'mongoose';
import { Collector } from '../../../collectors/entities/collector.entity';
import { ContainerDocument } from './container.document';

export interface CollectorDocument extends Collector, Document {
  container: ContainerDocument;
}
