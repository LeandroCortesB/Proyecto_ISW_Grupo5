"use strict";
import { EntitySchema } from "typeorm";

const CursoSchema = new EntitySchema({
    name: "Curso",
    tableName: "cursos",
    columns: {
        idCurso: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreCurso: {
            type: "varchar",
            length: 5,
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
        asignaturas: {
            type: "one-to-many",
            target: "Asignatura",
            inverseSide: "curso",
            cascade: true, // Borra las asignaturas asociadas al eliminar el curso
        },
        asistencias: {
            type: "one-to-many",
            target: "Asistencia",
            inverseSide: "curso",
            cascade: true, // Borra las asistencias asociadas al eliminar el curso
        },
        notas: {
            type: "one-to-many",
            target: "Nota",
            inverseSide: "curso",
            cascade: true, // Borra las notas asociadas al eliminar el curso
        },
        profesor: {
            type: "many-to-one",
            target: "User",
            joinColumn: true,
            nullable: false, // Cada curso debe estar asociado a un profesor
            onDelete: "SET NULL", // Si el profesor se elimina, el curso queda sin profesor
        },
    },
    indices: [
        {
            name: "IDX_CURSO",
            columns: ["idCurso"],
            unique: true,
        },
    ],
});

export default CursoSchema;
