"use strict";
import { EntitySchema } from "typeorm";

const HojaDeVidaSchema = new EntitySchema({
  name: "HojaDeVida",
  tableName: "hojas_de_vida",
  columns: {
    idInf: {
      type: "int",
      primary: true,
      generated: true,
    },
    estudianteId: {
      type: "int",
      nullable: false,
    },
    anotacionesComportamiento: {
      type: "varchar",
      length: 500,
      nullable: true,
    },
    observaciones: {
      type: "varchar",
      length: 1000,
      nullable: true,
    },
    estado: {
      type: "varchar",
      length: 50,
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
      name: "IDX_HOJA_DE_VIDA",
      columns: ["idInf"],
      unique: true,
    },
    {
      name: "IDX_HOJA_DE_VIDA_ESTUDIANTE_ID",
      columns: ["estudianteId"],
    },
  ],
});

export default HojaDeVidaSchema;
