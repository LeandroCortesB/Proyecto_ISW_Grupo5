"use strict";
import Joi from "joi";

export const paginaQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
})
  .or("id")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
    "Debes proporcionar el parámetro id de la hoja.",
  });

export const paginaBodyValidation = Joi.object({
  contenido: Joi.string()
    .min(10)
    .max(500)
    .messages({
      "string.empty": "El contenido no puede estar vacío.",
      "string.base": "El contenido debe ser de tipo string.",
      "string.min": "El contenido debe tener como mínimo 10 caracteres.",
      "string.max": "El contenido debe tener como máximo 500 caracteres.",
    }),
  numero: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El numero de pagina debe ser un número.",
      "number.integer": "El numero de pagina debe ser un número entero.",
      "number.positive": "El numero de pagina debe ser un número positivo.",
      "any.required": "El numero de pagina es obligatorio.",
    })
})
  .or(
    "contenido","numero"
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: contenido o numero.",
  });
