import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entidad')
export class Entidad {
    @PrimaryGeneratedColumn()
    ficha: string;

    @Column({ type: "varchar", length: 45, nullable: true })
    nombre: string;

    @Column({ type: "varchar", length: 45, nullable: true })
    cargo: string;

    @Column({ type: "int", nullable: false })
    codigoDepartamento: boolean;

    @Column({ type: "varchar", length: 45, nullable: true })
    departamento: boolean;

    @Column({ type: "varchar", length: 45, nullable: false })
    condicionEmpleado: boolean;
}