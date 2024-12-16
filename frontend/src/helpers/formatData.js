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

export function formatPostUpdate(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function formatAlumnoData(user) {
    return {
        ...user,
        id: user.id,
        nombreCompleto: startCase(user.nombreCompleto),
        email: startCase(user.email),
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

export function formatPostUpdateHoja(hoja) {
    return {
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

export function formatNotaData(nota) {
    return {
        ...nota,
        calificacion: startCase(nota.calificacion),
        createdAt: formatTempo(nota.createdAt, "DD-MM-YYYY"),
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

export function formatPostCreate(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function formatPostCreateHoja(hoja) {
    return {
        nombreCompleto: startCase(hoja.nombreCompleto),
        rut: formatRut(hoja.rut),
        buena: booleanizacion(hoja.buena),
        anotacion: startCase(hoja.anotacion),
        createdAt: formatTempo(hoja.createdAt, "DD-MM-YYYY")
    };
}

export function booleanizacion(buena) {
    let x = Boolean
    if(buena==='true'||buena==="true"||buena===true){
        x=true;
    }else{x=false;}
    return x
}

export function formatPostCreateAsignatura(asignatura) {
    return {
        nombreAsignatura: startCase(asignatura.nombreAsignatura),
        descripcion: startCase(asignatura.descripcion),
        createdAt: formatTempo(asignatura.createdAt, "DD-MM-YYYY"),

    };
}

export function formatPutEditAsignatura(asignatura) {
    return {
        nombreAsignatura: startCase(asignatura.nombreAsignatura),
        descripcion: startCase(asignatura.descripcion),
        createdAt: formatTempo(asignatura.createdAt, "DD-MM-YYYY"),
    };
}




