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
        alumno: {
        type: "many-to-one",
        target: "User",
        joinColumn: true,
        nullable: false, // La asistencia debe estar asociada a un usuario
        onDelete: "CASCADE", // Si se elimina el usuario, se elimina la asistencia asociada
    },
    asignatura:{
        type: "many-to-one",// un alumno puede tener muchas asistencias
        target: "Asignatura",
        joinColumn: { name: "idAsignatura", referencedColumnName: "idAsignatura" },
        nullable: false, // La asistencia debe estar asociada a una asignatura
        onDelete: "CASCADE",// Si se elimina el curso, se eliminan las asistencias asociadas
    },
}
});

export default AsistenciaSchema;