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

export const notaBodyValidation = Joi.object({
  calificacion: Joi.number()
    .positive()
    .min(1)
    .max(7)
    .messages({
      "number.base": "La calificacion debe ser un número.",
      "number.min": "La calificacion debe ser un número mayor o igual a 1.",
      "number.max": "La calificacion debe ser un número menor o igual a 7.",
      "number.positive": "La calificacion debe ser un número positivo."
    }), 

  periodo: Joi.string()
    .length(6)
    .pattern(/^[0-9-]+$/)
    .messages({
      "string.base": "El periodo debe ser un string.",
      "string.length": "El periodo debe tener 6 caracteres.",
      "string.pattern.base": "El periodo debe contener solo números y el símbolo '-'."
    }),

  estudianteId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El estudianteId debe ser un número.",
      "number.integer": "El estudianteId debe ser un número entero.",
      "number.positive": "El estudianteId debe ser un número positivo.",
      "any.required": "El estudianteId es obligatorio y debe estar asociado a un estudiante válido.",
    }),

  asignaturaId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El asignaturaId debe ser un número.",
      "number.integer": "El asignaturaId debe ser un número entero.",
      "number.positive": "El asignaturaId debe ser un número positivo.",
      "any.required": "El asignaturaId es obligatorio y debe estar asociado a una asignatura válida.",
    })
})

  .or("calificacion", "periodo", "estudianteId", "asignaturaId")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: calificacion, periodo, estudianteId o asignaturaId.",
  });
