"use strict";
import Nota from "../entity/nota.entity.js";
import Asignatura from "../entity/asignatura.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getNotaService(query) {
  try {
    const { rut } = query;
    const notaRepository = AppDataSource.getRepository(Nota);

    const notaFound = await notaRepository.findOne({
      where: { rut },
      relations: ["alumno", "asignatura"],
    });

    if (!notaFound) return [null, "Nota no encontrada"];
    return [notaFound, null];
  } catch (error) {
    console.error("Error al obtener la nota:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getNotasService() {
  try {
    const notaRepository = AppDataSource.getRepository(Nota);
    const notas = await notaRepository.find({
      relations: ["alumno", "asignatura"],
    });

    if (!notas || notas.length === 0) return [null, "No hay notas registradas"];
    return [notas, null];
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createNotaService(data) {
  try {
      const notaRepository = AppDataSource.getRepository(Nota);
      const asignaturaRepository = AppDataSource.getRepository(Asignatura);
      const userRepository = AppDataSource.getRepository(User);

      // Validar que la asignatura exista
      const asignaturaExists = await asignaturaRepository.findOne({
          where: { idAsignatura: data.asignaturaId },
      });
      if (!asignaturaExists) {
          return [null, "El asignaturaId es obligatorio y debe estar asociado a una asignatura válida."];
      }

      // Validar que el alumno exista
      const alumnoExists = await userRepository.findOne({
          where: { id: data.alumnoId },
      });
      if (!alumnoExists) {
          return [null, "El alumnoId es obligatorio y debe estar asociado a un alumno válido."];
      }

      // Crear la nueva nota
      const nuevaNota = notaRepository.create(data);
      await notaRepository.save(nuevaNota);

      return [nuevaNota, null];
  } catch (error) {
      console.error("Error al crear la nota:", error);
      return [null, "Error interno del servidor"];
  }
}

export async function updateNotaService(idNota, data) {
  try {
    const notaRepository = AppDataSource.getRepository(Nota);
    const notaFound = await notaRepository.findOne({ where: { idNota } });

    if (!notaFound) return [null, "Nota no encontrada"];
    await notaRepository.update(idNota, data);

    const notaUpdated = await notaRepository.findOne({
      where: { idNota },
      relations: ["alumno", "asignatura"],
    });
    return [notaUpdated, null];
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteNotaService(idNota) {
  try {
    const notaRepository = AppDataSource.getRepository(Nota);
    const notaFound = await notaRepository.findOne({ where: { idNota } });

    if (!notaFound) return [null, "Nota no encontrada"];
    const notaDeleted = await notaRepository.remove(notaFound);

    return [notaDeleted, null];
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    return [null, "Error interno del servidor"];
  }
}
