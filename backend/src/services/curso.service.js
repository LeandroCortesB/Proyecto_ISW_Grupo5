"use strict";
import Curso from "../entity/curso.entity.js";
import Asignatura from "../entity/asignatura.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getCursoService(query) {
  try {
    const { idCurso, nombreCurso } = query;

    const cursoRepository = AppDataSource.getRepository(Curso);

    const cursoFound = await cursoRepository.findOne({
      where: [{ idCurso: idCurso }, { nombreCurso: nombreCurso }],
    });

    if (!cursoFound) return [null, "Curso no encontrado"];

    return [cursoFound, null];
  } catch (error) {
    console.error("Error al obtener el curso:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getCursosService() {
  try {
    const cursoRepository = AppDataSource.getRepository(Curso);

    const cursos = await cursoRepository.find();

    if (!cursos || cursos.length === 0) return [null, "No hay cursos"];

    return [cursos, null];
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function createCursoService(body) {
    try {
      const cursoRepository = AppDataSource.getRepository(Curso);
  
      // Verificar si ya existe un curso con el mismo nombre
      const existingCurso = await cursoRepository.findOne({
        where: { nombreCurso: body.nombreCurso },
      });
  
      if (existingCurso) return [null, "Ya existe un curso con este nombre"];
  
      const nuevoCurso = cursoRepository.create({
        nombreCurso: body.nombreCurso,
        descripcion: body.descripcion,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      await cursoRepository.save(nuevoCurso);
  
      return [nuevoCurso, null];
    } catch (error) {
      console.error("Error al crear el curso:", error);
      return [null, "Error interno del servidor"];
    }
  }

export async function updateCursoService(query, body) {
  try {
    const { idCurso, nombreCurso } = query;

    const cursoRepository = AppDataSource.getRepository(Curso);

    const cursoFound = await cursoRepository.findOne({
      where: [{ idCurso: idCurso }, { nombreCurso: nombreCurso }],
    });

    if (!cursoFound) return [null, "Curso no encontrado"];

    const dataCursoUpdate = {
      nombreCurso: body.nombreCurso,
      descripcion: body.descripcion,
      updatedAt: new Date(),
    };

    await cursoRepository.update({ idCurso: cursoFound.idCurso }, dataCursoUpdate);

    const cursoUpdated = await cursoRepository.findOne({
      where: { idCurso: cursoFound.idCurso },
    });

    if (!cursoUpdated) {
      return [null, "Curso no encontrado después de actualizar"];
    }

    return [cursoUpdated, null];
  } catch (error) {
    console.error("Error al modificar un curso:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteCursoService(query) {
  try {
    const { idCurso, nombreCurso } = query;

    const cursoRepository = AppDataSource.getRepository(Curso);

    const cursoFound = await cursoRepository.findOne({
      where: [{ idCurso: idCurso }, { nombreCurso: nombreCurso }],
    });

    if (!cursoFound) return [null, "Curso no encontrado"];

    const cursoDeleted = await cursoRepository.remove(cursoFound);

    return [cursoDeleted, null];
  } catch (error) {
    console.error("Error al eliminar un curso:", error);
    return [null, "Error interno del servidor"];
  }
}
