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
        idCurso: {
            type: "int",
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
            joinColumn: { name: "idCurso" },
            nullable: false,
            onDelete: "CASCADE", // Opcional: borra la asignatura si el curso es eliminado
        },
        asistencias: {
            type: "one-to-many",
            target: "Asistencia",
            inverseSide: "asignatura",
            cascade: true, // Borra las asistencias asociadas al eliminar la asignatura
        },
        notas: {
            type: "one-to-many",
            target: "Nota",
            inverseSide: "asignatura",
            cascade: true, // Borra las notas asociadas al eliminar la asignatura
        },
        profesor: {
            type: "many-to-one",
            target: "User",
            joinColumn: true,
            nullable: true, // Cada asignatura debe estar asociada a un profesor
            onDelete: "SET NULL", // Si el profesor se elimina, la asignatura queda sin profesor
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
