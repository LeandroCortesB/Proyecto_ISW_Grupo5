"use strict";
import { EntitySchema } from "typeorm";

const HojaSchema = new EntitySchema({
  name: "Hoja",
  tableName: "hojas",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
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
      unique: true,
    },
    buena: {
      type: "boolean",
      nullable: true,
    },
    anotacion: {
      type: "varchar",
      length: 500,
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
  indices: [
    {
      name: "IDX_HOJA",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_HOJA_RUT",
      columns: ["rut"],
      unique: true,
    },
  ],
});

export default HojaSchema;