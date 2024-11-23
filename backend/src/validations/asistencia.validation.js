"use strict";
import Joi from "joi";
export const asistenciaBodyValidation = Joi.object({
fecha: Joi.date()
    .required()
    .messages({
        "date.base": "La fecha debe ser una fecha válida.",
        "date.format": "La fecha debe tener el formato YYYY-MM-DD.",
        "any.required": "La fecha es requerida.",
    }),
presente: Joi.boolean()
    .required()
    .messages({
        "boolean.base": "El campo presente debe ser un booleano.",
        "any.required": "El campo presente es requerido.",
    }),
estudiante: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
        "number.base": "El idEstudiante debe ser un número.",
        "number.integer": "El idEstudiante debe ser un número entero.",
        "number.positive": "El idEstudiante debe ser un número positivo.",
        "any.required": "El idEstudiante es requerido.",
    }),
curso: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
        "number.base": "El idCurso debe ser un número.",
        "number.integer": "El idCurso debe ser un número entero.",
        "number.positive": "El idCurso debe ser un número positivo.",
        "any.required": "El idCurso es requerido.",
    }),
})