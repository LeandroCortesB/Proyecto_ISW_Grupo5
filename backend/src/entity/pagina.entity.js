"use strict";
import { EntitySchema } from "typeorm";
import HojaSchema from "./hoja.entity.js";

const PaginaSchema = new EntitySchema({
  name: "Pagina",
  tableName: "paginas",
  columns: {
    idPagina: {
      type: "int",
      primary: true,
      generated: true,
      unique: true,
    },
    idHoja: {
      type: "int",
      primary: true,
      generated: false,
      unique: true,
    },
    rut: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    buenaAlarma: {
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
