"use strict";
import Nota from "../entity/nota.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getNotaService(query) {
  try {
    const { idNota } = query;
    const notaRepository = AppDataSource.getRepository(Nota);

    const notaFound = await notaRepository.findOne({
      where: { idNota },
      relations: ["estudiante", "asignatura"],
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
      relations: ["estudiante", "asignatura"],
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
      relations: ["estudiante", "asignatura"],
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
