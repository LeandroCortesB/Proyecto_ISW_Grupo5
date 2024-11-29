import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";


export function formatUserData(user) {
    return {
        ...user,
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function formatHojaData(hoja) {
    return {
        ...hoja,
        nombreCompleto: startCase(hoja.nombreCompleto),
        rut: formatRut(hoja.rut),
        anotacion: startCase(hoja.anotacion),
        buena: !!(hoja.buena),
        createdAt: formatTempo(hoja.createdAt, "DD-MM-YYYY")
    };
}


export function formatAsignaturaData(asignatura) {
    return {
        ...asignatura,
        nombreAsignatura: startCase(asignatura.nombreAsignatura),
        descripcion: startCase(asignatura.descripcion),
        createdAt: formatTempo(asignatura.createdAt, "DD-MM-YYYY"),
        cursoIdCurso: startCase(asignatura.cursoIdCurso)
    };
}

export function formatCursoData(curso) {
    return {
        ...curso,
        nombreCurso: startCase(curso.nombreCurso),
        createdAt: formatTempo(curso.createdAt, "DD-MM-YYYY")
    };
}
export function formatAsistenciaData(asistencia) {
    return {
        ...asistencia,
        // Ejemplo de formateo de la fecha de la asistencia
        fechaAsistencia: formatTempo(asistencia.fechaAsistencia, "DD-MM-YYYY"),
        // Si tienes algún campo booleando, puedes formatearlo también
        presente: asistencia.presente ? 'Presente' : 'Ausente',
    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function formatPostUpdate(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

