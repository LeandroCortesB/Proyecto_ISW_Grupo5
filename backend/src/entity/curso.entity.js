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
    indices: [
        {
            name: "IDX_CURSO",
            columns: ["idCurso"],
            unique: true,
        },
    ],
});

export default CursoSchema;
