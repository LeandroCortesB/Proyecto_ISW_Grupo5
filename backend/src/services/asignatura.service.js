"use strict";
import Asignatura from "../entity/asignatura.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getAsignaturaService(query) {
    try {
        const { idAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({
            where: [{ idAsignatura } ],
            relations: ["curso", "notas", "asistencias", "profesor"],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada"];

        return [asignaturaFound, null];
    } catch (error) {
        console.error("Error al obtener la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAsignaturasService() {
    try {
        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturas = await asignaturaRepository.find({
            relations: ["curso", "notas", "asistencias", "profesor"],
});

        if (!asignaturas || asignaturas.length === 0) return [null, "No hay asignaturas"];

        return [asignaturas, null];
    } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createAsignaturaService(body) {
    try{
   const asignaturaRepository = AppDataSource.getRepository(Asignatura);
   const nuevaAsignatura = asignaturaRepository.create({
         nombreAsignatura: body.nombreAsignatura,
         idCurso: { idCurso: body.idCurso },
         createdAt: new Date(),
         updatedAt: new Date(),
    });
    await asignaturaRepository.save(nuevaAsignatura);
    return [nuevaAsignatura, null];
} catch (error) {
    console.error("Error al crear la asignatura:", error);
    return [null, "Error interno del servidor"];
}

}

export async function updateAsignaturaService(query, body) {
    try {
        const { idAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({
            where: [{ idAsignatura } ],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada"];

        await asignaturaRepository.update(idAsignatura, body);

        const dataAsignaturaUpdated = {
            nombreAsignatura: body.nombreAsignatura,
            idCurso: body.idCurso,
            updatedAt: new Date(),
        };
        await asignaturaRepository.update(idAsignatura, dataAsignaturaUpdated);
        const asignaturaUpdated = await asignaturaRepository.findOne({
            where: [{ idAsignatura } ],
        });
        if(!asignaturaUpdated) return [null, "Error al actualizar la asignatura"];
        return [asignaturaUpdated, null];
    } catch (error) {
        console.error("Error al actualizar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteAsignaturaService(query) {
    try {
        const { idAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({
            where: [{ idAsignatura } ],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada"];

        await asignaturaRepository.remove(asignaturaFound);

        return [asignaturaFound, null];
    } catch (error) {
        console.error("Error al eliminar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}
export async function getAsignaturasByCursoService(idCurso) {
    try {
        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        // Filtrar las asignaturas por idCurso
        const asignaturas = await asignaturaRepository.find({
            where: { curso: { idCurso } }, // Filtra por curso
            relations: ["curso", "notas", "asistencias", "profesor"],
        });

        if (!asignaturas || asignaturas.length === 0) {
            return [null, "No hay asignaturas para este curso"];
        }

        return [asignaturas, null];
    } catch (error) {
        console.error("Error al obtener las asignaturas por curso:", error);
        return [null, "Error interno del servidor"];
    }
}
