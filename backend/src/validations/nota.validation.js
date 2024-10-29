"use strict";
import Joi from "joi";

// Validación de la consulta (query) para obtener o buscar notas
export const notaQueryValidation = Joi.object({
  idNota: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idNota debe ser un número.",
      "number.integer": "El idNota debe ser un número entero.",
      "number.positive": "El idNota debe ser un número positivo.",
    }),
  asignaturaId: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El asignaturaId debe ser un número.",
      "number.integer": "El asignaturaId debe ser un número entero.",
      "number.positive": "El asignaturaId debe ser un número positivo.",
    }),
  estudianteId: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El estudianteId debe ser un número.",
      "number.integer": "El estudianteId debe ser un número entero.",
      "number.positive": "El estudianteId debe ser un número positivo.",
    }),
})
  .or("idNota", "asignaturaId", "estudianteId")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: idNota, asignaturaId o estudianteId.",
  });

// Validación del cuerpo (body) para crear o actua
