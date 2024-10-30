"use strict";
import Asignatura from "../entity/asignatura.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getAsignaturaService(query) {
    try {
        const { idAsignatura, nombreAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({
            where: [{ idAsignatura }, { nombreAsignatura }],
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

        const asignaturas = await asignaturaRepository.find();

        if (!asignaturas || asignaturas.length === 0) return [null, "No hay asignaturas"];

        return [asignaturas, null];
    } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createAsignaturaService(body) {
    try {
        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const nuevaAsignatura = asignaturaRepository.create(body);
        await asignaturaRepository.save(nuevaAsignatura);

        return [nuevaAsignatura, null];
    } catch (error) {
        console.error("Error al crear la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateAsignaturaService(query, body) {
    try {
        const { idAsignatura, nombreAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({
            where: [{ idAsignatura }, { nombreAsignatura }],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada"];

        await asignaturaRepository.update(idAsignatura, body);

        const asignaturaUpdated = await asignaturaRepository.findOne({ where: { idAsignatura } });

        return [asignaturaUpdated, null];
    } catch (error) {
        console.error("Error al actualizar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteAsignaturaService(query) {
    try {
        const { idAsignatura, nombreAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({
            where: [{ idAsignatura }, { nombreAsignatura }],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada"];

        await asignaturaRepository.remove(asignaturaFound);

        return [asignaturaFound, null];
    } catch (error) {
        console.error("Error al eliminar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}
