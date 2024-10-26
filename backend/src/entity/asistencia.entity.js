"use strict";
import { EntitySchema } from "typeorm";

const Asistencia = new EntitySchema({
    name: "asistencia",
    tableName: "asistencias",
    columns: {
        id: {
        primary: true,
        type: "int",
        generated: true,
        },
        fecha: {
        type: "date",
        },
        hora: {
        type: "time",
        },
        tipo: {
        type: "varchar",
        },
        observacion: {
        type: "varchar",
        },
    },
    relations: {
        estudiante: {
        target: "estudiante",
        type: "many-to-one",
        joinColumn: true,
        cascade: true,
        },
        curso: {
        target: "curso",
        type: "many-to-one",
        joinColumn: true,
        cascade: true,
        },
    },

})

export default Asistencia;