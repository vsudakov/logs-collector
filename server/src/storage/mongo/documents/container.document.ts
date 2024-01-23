import { Document } from 'mongoose';
import { Container } from '../../../logs/entities/container.entity';

export interface ContainerDocument extends Container, Document {}
