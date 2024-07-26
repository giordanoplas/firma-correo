import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entidad } from '../entities/entidad.entity';

@Injectable()
export class EntidadService {

    constructor(@InjectRepository(Entidad) private entidadesRepository: Repository<Entidad>) { }

    /**
     * Retorna un arreglo vacío para no mostrar información innecesaria
     * @returns []
     */
    async getAll(): Promise<Entidad[]> {
        return []
    }

    /**
     * Retorna la entidad por la ficha
     * @param ficha
     * @returns 
     */
    async getByFicha(ficha: string): Promise<Entidad> {
        return await this.entidadesRepository.query(`
            SELECT e.ficha, e.nombre, c.nombre AS 'cargo', cc.codigo AS 'codigo_departamento', cc.nombre AS 'departamento', e.condicion_empleado FROM entidad e
            INNER JOIN cargo c ON c.codigo=e.cargo_codigo
            INNER JOIN centro_cnt cc ON cc.codigo=e.centro_cnt_codigo
            WHERE ficha=`+ ficha + ` 
            LIMIT 1
        `)
    }
}