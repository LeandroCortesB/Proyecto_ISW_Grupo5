"use strict";
import Joi from "joi";

export const paginaQueryValidation = Joi.object({
  idPagina: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
  rut: Joi.string()
      .min(9)
      .max(12)
      .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
      .messages({
        "string.empty": "El rut no puede estar vacío.",
        "string.base": "El rut debe ser de tipo string.",
        "string.min": "El rut debe tener como mínimo 9 caracteres.",
        "string.max": "El rut debe tener como máximo 12 caracteres.",
        "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
      }),  
})
  .or("idPagina","rut")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro: id o rut.",
  });

export const paginaBodyValidation = Joi.object({
  rut: Joi.string()
      .min(9)
      .max(12)
      .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
      .messages({
        "string.empty": "El rut no puede estar vacío.",
        "string.base": "El rut debe ser de tipo string.",
        "string.min": "El rut debe tener como mínimo 9 caracteres.",
        "string.max": "El rut debe tener como máximo 12 caracteres.",
        "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
      }),
  idHoja: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El idHoja debe ser un número.",
      "number.integer": "El idHoja debe ser un número entero.",
      "number.positive": "El idHoja debe ser un número positivo.",
      "any.required": "El idHoja es obligatorio.",
    }),
  buenaAlarma: Joi.boolean()
      .messages({
        "boolean.base": "El campo buena debe ser de tipo booleano (true o false) para identificar la anotacion."
      }),  
})
  .or(
    "rut",
    "idHoja",
    "buenaAlarma",
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: rut, idHoja, buenaAlarma",
  });
