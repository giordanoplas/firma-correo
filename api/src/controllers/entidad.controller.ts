import { Controller, Get, Param } from '@nestjs/common';
import { EntidadService } from '../services/entidad.service';
//import { Entidad } from '../entities/entidad.entity';

@Controller('api/v1/enterprise')
export class EntidadController {

    constructor(private entidadService: EntidadService) { }

    @Get()
    findAll() {
        return this.entidadService.getAll();
    }

    @Get(':ficha')
    findByFicha(@Param() params) {
        return this.entidadService.getByFicha(params.ficha);
    }    

}
