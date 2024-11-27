"use strict";
import Hoja from "../entity/hoja.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getHojaService(query) {
  try {
    const { rut, id } = query;

    const HojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ id: id }, { rut: rut }],
    });

    if (!hojaFound) return [null, "Hoja de vida no encontrada"];

    const { ...hojaData } = hojaFound;

    return [hojaData, null];
  } catch (error) {
    console.error("Error obtener la hoja de vida:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getHojasService() {
  try {
    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojas = await hojaRepository.find();

    if (!hojas || hojas.length === 0) return [null, "No hay hojas de vida"];

    const hojasData = hojas.map(({ ...hoja }) => hoja);

    return [hojasData, null];
  } catch (error) {
    console.error("Error al obtener todas las hojas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createHojaService(body){
  try{
    const hojaRepository = AppDataSource.getRepository(hoja);
  
    const hojaFound = await hojaRepository.findOne({
      where: [{ id: id }, { rut: rut }],
    });

    if (hojaFound) return [null, "Ya existe una hoja con ese rut"];
  
    const nuevoHoja = hojaRepository.create({
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      buena: body.buena,
      anotacion: body.anotacion,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    await hojaRepository.save(nuevoHoja);
  
    return [nuevoHoja, null];
  } catch (error) {
    console.error("Error al crear la hoja:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateHojaService(query, body) {
  try {
    const { id, rut } = query;

    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ id: id }, { rut: rut }],
    });

    if (!hojaFound) return [null, "Hoja de vida no encontrada"];

    const existingHoja = await hojaRepository.findOne({
      where: [{ rut: body.rut }],
    });

    if (existingHoja && existingHoja.id !== hojaFound.id) {
      return [null, "Ya existe una hoja con el mismo rut"];
    }

    const dataHojaUpdate = {
      buena: body.buena,
      anotacion: body.anotacion,
      updatedAt: new Date(),
    };

    await hojaRepository.update({ id: hojaFound.id }, dataHojaUpdate);

    const hojaData = await hojaRepository.findOne({
      where: { id: hojaFound.id },
    });

    if (!hojaData) {
      return [null, "Hoja de vida no encontrada después de actualizar"];
    }

    const { ...hojaUpdated } = hojaData;

    return [hojaUpdated, null];
  } catch (error) {
    console.error("Error al modificar la hoja de vida:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteHojaService(query) {
  try {
    const { id, rut } = query;

    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ id: id }, { rut: rut }],
    });

    if (!hojaFound) return [null, "Hoja de vida no encontrada"];

    const hojaDeleted = await hojaRepository.remove(hojaFound);

    const { ...dataHoja } = hojaDeleted;

    return [dataHoja, null];
  } catch (error) {
    console.error("Error al eliminar una hoja de vida:", error);
    return [null, "Error interno del servidor"];
  }
}

export default deleteHojaService;