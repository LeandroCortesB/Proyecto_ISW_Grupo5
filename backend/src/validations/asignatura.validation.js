"use strict";
import Joi from "joi";

// Validación de la consulta (query) para obtener o buscar asignaturas
export const asignaturaQueryValidation = Joi.object({
  idAsignatura: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idAsignatura debe ser un número.",
      "number.integer": "El idAsignatura debe ser un número entero.",
      "number.positive": "El idAsignatura debe ser un número positivo.",
    }),
  nombreAsignatura: Joi.string()
    .min(5)
    .max(100)
    .messages({
      "string.empty": "El nombre de la asignatura no puede estar vacío.",
      "string.base": "El nombre de la asignatura debe ser de tipo string.",
      "string.min": "El nombre de la asignatura debe tener como mínimo 5 caracteres.",
      "string.max": "El nombre de la asignatura debe tener como máximo 100 caracteres.",
    }),
})
  .or("idAsignatura", "nombreAsignatura")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: idAsignatura o nombreAsignatura.",
  });

// Validación del cuerpo (body) para crear o actualizar una asignatura
export const asignaturaBodyValidation = Joi.object({
  nombreAsignatura: Joi.string()
    .min(5)
    .max(100)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre de la asignatura no puede estar vacío.",
      "string.base": "El nombre de la asignatura debe ser de tipo string.",
      "string.min": "El nombre de la asignatura debe tener como mínimo 5 caracteres.",
      "string.max": "El nombre de la asignatura debe tener como máximo 100 caracteres.",
      "string.pattern.base": "El nombre de la asignatura solo puede contener letras y espacios.",
    }),
  descripcion: Joi.string()
    .max(500)
    .optional()
    .messages({
      "string.base": "La descripción debe ser de tipo string.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
    }),
  idCurso: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El idCurso debe ser un número.",
      "number.integer": "El idCurso debe ser un número entero.",
      "number.positive": "El idCurso debe ser un número positivo.",
      "any.required": "El idCurso es obligatorio y debe estar asociado a un curso válido.",
    }),
})
  .or("nombreAsignatura", "descripcion", "idCurso")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un campo: nombreAsignatura, descripcion o idCurso.",
  });
