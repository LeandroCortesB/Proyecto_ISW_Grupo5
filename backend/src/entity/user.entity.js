"use strict";
import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
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
    email: {
      type: "varchar",
      length: 255,
      nullable: false,
      unique: true,
    },
    rol: {
      type: "enum",
      enum: ["alumno", "profesor", "apoderado"],
      nullable: false,
    },
    password: {
      type: "varchar",
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
    // Relación con asistencias (sólo aplica si el rol es 'alumno')
    asistencias: {
      type: "one-to-many",
      target: "Asistencia",
      inverseSide: "alumno",
      cascade: true,
    },
    // Relación con curso (sólo aplica si el rol es 'alumno')
    curso: {
      type: "many-to-one",
      target: "Curso",
      inverseSide: "alumnos",
      joinColumn: true,
      nullable: true, // Nullable para roles como profesor/apoderado
      onDelete: "CASCADE",
    },
    // Relación con asignaturas (sólo aplica si el rol es 'profesor')
    asignaturas: {
      type: "one-to-many",
      target: "Asignatura",
      inverseSide: "profesor",
      cascade: true,
    },
    // Relación con alumnos a cargo (aplica si el rol es 'apoderado')
    apoderadoEncargado: {
      type: "one-to-many",
      target: "User", // Referencia a otros usuarios con rol 'alumno'
      inverseSide: "apoderado",
      joinColumn: true,
      cascade: true,
    },
    // Relación con apoderado (aplica si el rol es 'alumno')
    apoderado: {
      type: "many-to-one",
      target: "User", // Referencia a un usuario con rol 'apoderado'
      joinColumn: true,
      nullable: true,
      onDelete: "SET NULL", // Si se elimina el apoderado, los alumnos no se eliminan
    },
    // Relación con notas (sólo aplica si el rol es 'alumno')
    notas: {
      type: "one-to-many",
      target: "Nota", // Referencia al esquema de Nota
      inverseSide: "alumno", // Relación inversa desde Nota hacia Alumno
      cascade: true,
    },
    // Relación con hojas de vida (sólo aplica si el rol es 'alumno')
    hojas: {
      type: "one-to-many",
      target: "Hoja", // Referencia al esquema de Hoja
      inverseSide: "alumno", // Relación inversa desde Hoja hacia Alumno
      cascade: true,
  },
  },
  indices: [
    {
      name: "IDX_USER",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_USER_RUT",
      columns: ["rut"],
      unique: true,
    },
    {
      name: "IDX_USER_EMAIL",
      columns: ["email"],
      unique: true,
    },
  ],
});

export default UserSchema;