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
  asignatura: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El asignaturaId debe ser un número.",
      "number.integer": "El asignaturaId debe ser un número entero.",
      "number.positive": "El asignaturaId debe ser un número positivo.",
    }),
  alumno: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El alumnoId debe ser un número.",
      "number.integer": "El alumnoId debe ser un número entero.",
      "number.positive": "El alumnoId debe ser un número positivo.",
    }),
})

  .or("idNota", "idAsignatura", "idAlumno")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: idNota, asignaturaId o alumnoId.",
  });

// Validación del cuerpo (body) para crear o actua

export const notaBodyValidation = Joi.object({
  calificacion: Joi.number()
    .positive()
    .min(10)
    .max(70)
    .messages({
      "number.base": "La calificacion debe ser un número.",
      "number.min": "La calificacion debe ser un número mayor o igual a 10.",
      "number.max": "La calificacion debe ser un número menor o igual a 70.",
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

  alumno: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El alumnoId debe ser un número.",
      "number.integer": "El alumnoId debe ser un número entero.",
      "number.positive": "El alumnoId debe ser un número positivo.",
      "any.required": "El alumnoId es obligatorio y debe estar asociado a un alumno válido.",
    }),

  asignatura: Joi.number()
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

  .or("calificacion", "periodo", "idAlumno", "idAsignatura")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: calificacion, periodo, alumnoId o asignaturaId.",
  });
