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
    .trim()
    .pattern(/^\d+-[A-Z]$/) // Validar formato exacto
    .messages({
      "string.empty": "El nombre del curso no puede estar vacío.",
      "string.base": "El nombre del curso debe ser de tipo string.",
      "string.pattern.base": "El nombre del curso debe tener el formato 'número-guion-letra mayúscula' (ej: 1-A).",
    }),
})
  .or("idCurso", "nombreCurso") // Permitir que al menos uno sea proporcionado
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos idCurso o nombreCurso.",
  });

// Validación del cuerpo (body) para crear o actualizar un curso
export const cursoBodyValidation = Joi.object({
  nombreCurso: Joi.string()
    .trim()
    .pattern(/^\d+-[A-Z]$/) // Validar formato exacto
    .required() // Requerir siempre el nombre del curso
    .messages({
      "string.empty": "El nombre del curso no puede estar vacío.",
      "string.base": "El nombre del curso debe ser de tipo string.",
      "string.pattern.base": "El nombre del curso debe tener el formato 'número-guion-letra mayúscula' (ej: 1-A).",
      "any.required": "El nombre del curso es obligatorio.",
    }),
  descripcion: Joi.string()
    .max(255) // Longitud máxima de la descripción
    .messages({
      "string.max": "La descripción no puede exceder los 255 caracteres.",
    }),
});
