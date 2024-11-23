"use strict";
import { EntitySchema } from "typeorm";
const AsistenciaSchema = new EntitySchema({
    name: "Asistencia",
    tableName: "asistencias",
    columns: {
        idAsistencia: {
            type: "int",
            primary: true,
            generated: true,
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        asistio: {
            type: "boolean",
            nullable: false,
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
        estudiante: {
        type: "many-to-one",
        target: "Estudiante",
        joinColumn: true,
        nullable: false,
        onDelete: "CASCADE",
    },
    curso:{
        type: "many-to-one",
        target: "Curso",
        joinColumn: true,
        nullable: false,
        onDelete: "CASCADE",
    },
}
});

export default AsistenciaSchema;