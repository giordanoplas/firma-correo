import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadService } from '../services/entidad.service';
import { EntidadController } from '../controllers/entidad.controller';
import { Entidad } from '../entities/entidad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Entidad])],
    providers: [EntidadService],
    controllers: [EntidadController]
})

export class EntidadModule { }