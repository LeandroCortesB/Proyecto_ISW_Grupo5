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

    const asistencias = data.asistencias.map((asistencia) =>
      asistenciaRepository.create({
        fecha: data.fecha,
        asistio: asistencia.asistio, // Aquí asignamos el valor recibido del frontend
        alumno: { id: asistencia.idAlumno }, // Relación con el alumno
        asignatura: { idAsignatura: data.idAsignatura }, // Relación con la asignatura
      })
    );
  
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
