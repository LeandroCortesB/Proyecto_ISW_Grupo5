"use strict";
import Pagina from "../entity/pagina.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPaginaService(query) {
  try {
    const { rut, idHoja } = query;

    const PaginaRepository = AppDataSource.getRepository(Pagina);

    const paginaFound = await paginaRepository.findOne({
      where: [{ idHoja }, { rut }],
    });

    if (!paginaFound) return [null, "pagina no encontrada"];

    const { ...paginaData } = paginaFound;

    return [paginaData, null];
  } catch (error) {
    console.error("Error obtener la pagina:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createPaginaService(body) {
  try {
    const paginaRepository = AppDataSource.getRepository(Pagina);
    const nuevaPagina = paginaRepository.create({
      idHoja: body.idHoja,
      rut: body.rut,
      buenaAlarma: body.buenaAlarma,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await paginaRepository.save(nuevaPagina);

    return [nuevaPagina, null];
  } catch (error) {
    console.error("Error al crear la pagina:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updatePaginaService(query, body) {
  try {
    const { idPagina, rut } = query;

    const paginaRepository = AppDataSource.getRepository(Pagina);

    const paginaFound = await paginaRepository.findOne({
      where: [{ idPagina }],
    });

    if (!paginaFound) return [null, "Pagina no encontrada"];

    await paginaRepository.update(idPagina, body);

    const dataPaginaUpdate = {
      buenaAlarma: body.buenaAlarma,
      updatedAt: new Date(),
    };

    await paginaRepository.update( idPagina , dataPaginaUpdate);

    const paginaData = await paginaRepository.findOne({
      where: { idPagina: paginaFound.idPagina },
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



export async function deletePaginaService(query) {
  try {
    const { idPagina } = query;

    const paginaRepository = AppDataSource.getRepository(Pagina);

    const paginaFound = await paginaRepository.findOne({
      where: [{ idPagina: idPagina }],
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

