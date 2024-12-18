"use strict";
import { EntitySchema } from "typeorm";

const HojaSchema = new EntitySchema({
  name: "Hoja",
  tableName: "hojas",
  columns: {
    idHoja: {
      type: "int",
      primary: true,
      generated: true,
      unique: true,
    },
    nombreCompleto: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    rut: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: false,
    },
    buena: {
      type: "boolean",
      nullable: true,
    },
    anotacion: {
      type: "varchar",
      length: 100,
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
    alumno: {
      type: "many-to-one",
      target: "User", 
      joinColumn: true,
      nullable: true,
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_HOJA",
      columns: ["idHoja"],
      unique: true,
    },
    {
      name: "IDX_HOJA_RUT",
      columns: ["rut"],
      unique: false,
    },
  ],
});

export default HojaSchema;
