"use strict";
import Pagina from "../entity/pagina.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPaginaService(query) {
  try {
    const { numero } = query;

    const PaginaRepository = AppDataSource.getRepository(Pagina);

    const paginaFound = await paginaRepository.findOne({
      where: [{ numero : numero }],
    });

    if (!paginaFound) return [null, "pagina no encontrada"];

    const { ...paginaData } = paginaFound;

    return [paginaData, null];
  } catch (error) {
    console.error("Error obtener la pagina:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updatePaginaService(query, body) {
  try {
    const { numero } = query;

    const paginaRepository = AppDataSource.getRepository(Pagina);

    const paginaFound = await paginaRepository.findOne({
      where: [{ numero : numero }],
    });

    if (!paginaFound) return [null, "Pagina no encontrada"];

    const existingPagina = await paginaRepository.findOne({
      where: [{ numero: body.numero }],
    });

    if (existingPagina && existingPagina.id !== hojaFound.id) {
      return [null, "Ya existe una pagina con el mismo numero"];
    }

    const dataPaginaUpdate = {
      contenido: body.contenido,
      updatedAt: new Date(),
    };

    await PaginaRepository.update({ id: paginaFound.id }, dataPaginaUpdate);

    const hojaData = await hojaRepository.findOne({
      where: { id: paginaFound.id },
    });

    if (!paginaData) {
      return [null, "Pagina no encontrada después de actualizar"];
    }

    const { ...paginaUpdated } = paginaData;

    return [paginaUpdated, null];
  } catch (error) {
    console.error("Error al modificar la pagina:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createPaginaService(data) {
    try {
      const paginaRepository = AppDataSource.getRepository(Pagina);
      const nuevaPagina = paginaRepository.create(data);
      await paginaRepository.save(nuevaPagina);
      return [nuevaPagina, null];
    } catch (error) {
      console.error("Error al crear la pagina:", error);
      return [null, "Error interno del servidor"];
    }
  }

export async function deletePaginaService(query) {
  try {
    const { id } = query;

    const paginaRepository = AppDataSource.getRepository(Pagina);

    const paginaFound = await paginaRepository.findOne({
      where: [{ id: id }],
    });

    if (!paginaFound) return [null, "Pagina no encontrada"];

    const paginaDeleted = await paginaRepository.remove(paginaFound);

    const { ...dataPagina } = paginaDeleted;

    return [dataPagina, null];
  } catch (error) {
    console.error("Error al eliminar una pagina:", error);
    return [null, "Error interno del servidor"];
  }
}

