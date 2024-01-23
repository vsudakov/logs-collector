import { Document } from 'mongoose';
import { Container } from '../../../collectors/entities/container.entity';

export interface ContainerDocument extends Container, Document {}
