"use strict";
import Joi from "joi";

// Validación de la consulta (query) para obtener o buscar cursos
export const cursoQueryValidation = Joi.object({
  idCurso: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idCurso debe ser un número.",
      "number.integer": "El idCurso debe ser un número entero.",
      "number.positive": "El idCurso debe ser un número positivo.",
    }),
  nombreCurso: Joi.string()
    .min(2)
    .max(3)
    .messages({
      "string.empty": "El nombre del curso no puede estar vacío.",
      "string.base": "El nombre del curso debe ser de tipo string.",
      "string.min": "El nombre del curso debe tener como mínimo 2 caracteres.",
      "string.max": "El nombre del curso debe tener como máximo 3 caracteres.",
    }),
})
  .or("idCurso", "nombreCurso")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: idCurso o nombreCurso.",
  });

// Validación del cuerpo (body) para crear o actualizar un curso
export const cursoBodyValidation = Joi.object({
  nombreCurso: Joi.string()
    .min(2)
    .max(3)
    .messages({
      "string.empty": "El nombre del curso no puede estar vacío.",
      "string.base": "El nombre del curso debe ser de tipo string.",
      "string.min": "El nombre del curso debe tener como mínimo 2 caracteres.",
      "string.max": "El nombre del curso debe tener como máximo 3 caracteres.",
      "string.pattern.base": "El nombre del curso solo puede contener letras y espacios.",
    }),
  });
