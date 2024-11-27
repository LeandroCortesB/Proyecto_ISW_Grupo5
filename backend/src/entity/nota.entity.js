"use strict";
import { EntitySchema } from "typeorm";

const NotaSchema = new EntitySchema({
  name: "Nota",
  tableName: "notas",
  columns: {
    idNota: {
      type: "int",
      primary: true,
      generated: true,
    },
    calificacion: {
      type: "float",
      nullable: false,
    },
    periodo: {
      type: "varchar",
      length: 7,
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
      joinColumn: true, // Asegúrate de que el campo sea correcto
      nullable: false,// Una nota siempre debe estar asociada a un alumno
      onDelete: "CASCADE",
    },
    asignatura: {
      type: "many-to-one",
      target: "Asignatura",
      joinColumn: true,
      nullable: false,// Una nota siempre debe estar asociada a una asignatura
      onDelete: "CASCADE",
    },
  },
});

export default NotaSchema;
