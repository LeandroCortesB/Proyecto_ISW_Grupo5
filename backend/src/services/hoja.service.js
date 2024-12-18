"use strict";
import Hoja from "../entity/hoja.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { sendEmail } from "../services/email.service.js";
import { DataTypeNotSupportedError } from "typeorm";

export async function getHojaService(query) {
  try {
    const { rut, idHoja } = query;

    const HojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ idHoja }, { rut }],
    });

    if (!hojaFound) return [null, "Hoja de vida no encontrada"];

    const { ...hojaData } = hojaFound;

    return [hojaData, null];
  } catch (error) {
    console.error("Error obtener la hoja de vida:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function getHojasService(rut) {
  try {
    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojas = await hojaRepository.find({
      where: { rut: rut },
    });

    if (!hojas || hojas.length === 0) {
      return [null, "No se encontraron hojas de vida para el rut proporcionado"];
    }

    const hojasData = hojas.map(({ ...hoja }) => hoja);

    return [hojasData, null];
  } catch (error) {
    console.error("Error al obtener las hojas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createHojaService(body){
  try{
    const hojaRepository = AppDataSource.getRepository(Hoja);

    console.log("aca bue", body.buena);

    const nuevoHoja = hojaRepository.create({
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      buena: body.buena,
      anotacion: body.anotacion,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    await hojaRepository.save(nuevoHoja);
  
    if(body.buena===false||body.buena==="false"){
      const userRepository = AppDataSource.getRepository(User);

      const userFound = await userRepository.findOne({
        where: [{ rut: body.rut }],
      });

      if (!userFound) return [null, "Usuario para hoja no encontrado"];

      const email = String(userFound.email); //"andrea.tapia2101@alumnos.ubiobio.cl"; 
      const subject = "OJO! Anotacion negativa";
      const message = String("Usted ha recibido una nueva anotacion negativa al libro que dice: \n" + body.anotacion);

      const info = await sendEmail(
        email,
        subject,
        message,
        `<p>${message}</p>`
      );
      console.log("email ",info.email);
    }

    return [nuevoHoja, null];
  } catch (error) {
    console.error("Error al crear la hoja:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function updateHojaService(query, body) {
  try {
    const { idHoja } = query;

    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ idHoja: idHoja }],
    });

    if (!hojaFound) return [null, "Hoja de vida no encontrada"];

    const dataHojaUpdate = {
      anotacion: body.anotacion,
      updatedAt: new Date(),
    };

    await hojaRepository.update({ idHoja: hojaFound.idHoja }, dataHojaUpdate);

    const hojaData = await hojaRepository.findOne({
      where: { idHoja: hojaFound.idHoja },
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
    const { idHoja } = query;

    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ idHoja: idHoja }],
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