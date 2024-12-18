"use strict";
import Asistencia from "../entity/asistencia.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getAsistenciaService(query) {
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const asistencia = await asistenciaRepository.find({
            where: query,
            relations: ["alumno", "asignatura"],
        });
        
        if (!asistencia || asistencia.length === 0) return [null, "No hay asistencias"];    
        return [asistencia, null];
    } catch (error) {
        console.error("Error al obtener las asistencias:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAsistenciasService() {
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const asistencias = await asistenciaRepository.find({ relations: ["alumno", "asignatura"] });
        if (!asistencias || asistencias.length === 0) return [null, "No hay asistencias"];
        return [asistencias, null];
    } catch (error) {
        console.error("Error al obtener las asistencias:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createAsistenciaService(data) {
    const asistenciaRepository = AppDataSource.getRepository(Asistencia);

    const asistencias = [];
    for (const asistencia of data.asistencias) {
        const existeAsistencia = await asistenciaRepository.findOne({
            where: {
                alumno: { id: asistencia.idAlumno },
                asignatura: { idAsignatura: data.idAsignatura },
                fecha: data.fecha,
            },
        });

        if (existeAsistencia) {
            throw new Error(
                `El alumno con ID ${asistencia.idAlumno} ya tiene una asistencia registrada en esta fecha y asignatura.`
            );
        }

        const nuevaAsistencia = asistenciaRepository.create({
            fecha: data.fecha,
            asistio: asistencia.asistio,
            alumno: { id: asistencia.idAlumno },
            asignatura: { idAsignatura: data.idAsignatura },
        });
        asistencias.push(nuevaAsistencia);
    }

    await asistenciaRepository.save(asistencias);
    return asistencias;
}


export async function updateAsistenciaService(idAsistencia, body){
    try{
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const asistenciaFound = await asistenciaRepository.findOne({ where: { idAsistencia: idAsistencia } });
        if (!asistenciaFound) return [null, "Asistencia no encontrada"];
        await asistenciaRepository.update(idAsistencia, body);
        const asistenciaActualizada = await asistenciaRepository.findOne({ where: { idAsistencia: idAsistencia } });
        return [asistenciaActualizada, null];
    } catch (error) {
        console.error("Error al actualizar la asistencia:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteAsistenciaService(idAsistencia){
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const asistenciaFound = await asistenciaRepository.findOne({ where: { idAsistencia: idAsistencia } });
        if (!asistenciaFound) return [null, "Asistencia no encontrada"];
        await asistenciaRepository.remove(asistenciaFound);
        return ["Asistencia eliminada correctamente", null];	                
    } catch (error) {
        console.error("Error al eliminar la asistencia:", error);
        return [null, "Error interno del servidor"];
    } 
}

export async function getAsistenciaByAlumnoService(rut, fechaInicio, fechaFin, idAsignatura) {
  try {
    if (!rut || !fechaInicio || !fechaFin) {
      throw new Error("El ID del alumno, las fechas y asignatura son obligatorias.");
    }

    const asistenciaRepository = AppDataSource.getRepository(Asistencia);

    const query = asistenciaRepository
      .createQueryBuilder("asistencia")
      .leftJoinAndSelect("asistencia.alumno", "alumno")
      .leftJoinAndSelect("asistencia.asignatura", "asignatura")
      .where("alumno.rut = :rut", { rut })
      .andWhere("asistencia.fecha BETWEEN :fechaInicio AND :fechaFin", { fechaInicio, fechaFin });

    // Agregar filtro de asignatura si se proporciona
    if (idAsignatura) {
      query.andWhere("asistencia.asignatura.idAsignatura = :idAsignatura", { idAsignatura });
    }

    const asistencias = await query.orderBy("asistencia.fecha", "ASC").getMany();

    if (!asistencias || asistencias.length === 0) {
      return [null, "No se encontraron asistencias para el alumno en este período."];
    }

    return [asistencias, null];
  } catch (error) {
    console.error("Error en getAsistenciaByAlumnoService:", error.message);
    return [null, "Error interno del servidor"];
  }
}
