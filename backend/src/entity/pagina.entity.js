"use strict";
import { EntitySchema } from "typeorm";
import HojaSchema from "./hoja.entity.js";

const PaginaSchema = new EntitySchema({
  name: "Pagina",
  tableName: "paginas",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    contenido: {
      type: "varchar",
      length: 400,
      nullable: true,
    },
    numero: {
      type: "int",
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
    hoja: {
      type: "many-to-one",
      target: "Hoja",
      joinColumn: { name: "hojaId" },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

export default PaginaSchema;
