"use strict";
import { EntitySchema } from "typeorm";

const AsignaturaSchema = new EntitySchema({
    name: "Asignatura",
    tableName: "asignaturas",
    columns: {
        idAsignatura: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreAsignatura: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        descripcion: {
            type: "varchar",
            length: 255,
            nullable: true,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    relations: {
        curso: {
            type: "many-to-one",
            target: "Curso",
            joinColumn: true,
            nullable: false,
            onDelete: "CASCADE", // Opcional: borra la asignatura si el curso es eliminado
        },
    },
    indices: [
        {
            name: "IDX_ASIGNATURA",
            columns: ["idAsignatura"],
            unique: true,
        },
    ],
});

export default AsignaturaSchema;
