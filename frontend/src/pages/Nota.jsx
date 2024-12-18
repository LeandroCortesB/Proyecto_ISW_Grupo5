import React, { useState, useEffect } from 'react';
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { toast } from "@components/ui/toast"
import Search from '@components/Search';
import useCursos from '@hooks/cursos/useGetCursos';
import useNotas from '@hooks/nota/useGetNotas';
import useCreateNota from "@hooks/nota/useCreateNota";
import { getAsignaturasByCurso } from "@services/asignatura.service.js";
import { getUsersByCurso } from "@services/user.service.js";
import '@styles/nota.css';

const GestionNotas = () => {
    const { cursos } = useCursos();
    const { notas, setNotas } = useNotas();
    const [cursoSeleccionado, setCursoSeleccionado] = useState("");
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
    const [alumnos, setAlumnos] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [filter, setFilterNombre] = useState("");
    const [error, setError] = useState(null);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [guardando, setGuardando] = useState(false);
    const [periodo, setPeriodo] = useState("");
    const { handleCreate } = useCreateNota(setNotas);
    const [evaluacionCreada, setEvaluacionCreada] = useState(false);

    useEffect(() => {
        if(cursoSeleccionado) {
            const fetchAlumnos = async () => {
                try {
                    const alumnosData = await getUsersByCurso(cursoSeleccionado);
                    setAlumnos(alumnosData.map(alumno => ({
                        ...alumno,
                        notas: []
                    })) || []);
                } catch (err) {
                    console.error("Error al cargar alumnos:", err);
                    setError("Error al cargar los alumnos.");
                }
            };
            fetchAlumnos();
        } else {
            setAlumnos([]);
        }
    }, [cursoSeleccionado]);

    useEffect(() => {
        if (cursoSeleccionado) {
            const fetchAsignaturas = async () => {
                try {
                    const asignaturasData = await getAsignaturasByCurso(cursoSeleccionado);
                    setAsignaturas(asignaturasData || []);
                } catch (err) {
                    console.error("Error al cargar asignaturas:", err);
                    setError("Error al cargar las asignaturas.");
                }
            };
            fetchAsignaturas();
        } else {
            setAsignaturas([]);
        }
    }, [cursoSeleccionado]);
                
    const crearEvaluacion = () => {
        if (!evaluacionCreada) {
            setEvaluaciones(["Evaluación"]);
            setAlumnos(alumnos.map(alumno => ({
                ...alumno,
                notas: [null] // Una sola evaluación inicializada con null
            })));
            setEvaluacionCreada(true); // Marcar que ya se creó la evaluación
        }
    };

    const actualizarNota = (alumnoId, evaluacionIndex, nota) => {
        setAlumnos(alumnos.map(alumno =>
            alumno.id === alumnoId
                ? {...alumno,
                    notas: alumno.notas.map((n, i) => i === evaluacionIndex ? Number(nota) : n)
                }
                : alumno));};

    const handleSubmit = async (alumnoId, calificacion) => {
        const dataWithNotaId = {  
            asignatura: +asignaturaSeleccionada, 
            periodo: periodo,
            alumno: alumnoId,
            calificacion: calificacion
        };
        const newNota = await handleCreate(dataWithNotaId);
        if (newNota) {
            setNotas([...notas, newNota]);
            console.success("Nota creada exitosamente");
        } else {
            console.error("Error al crear la nota");
        }
        console.log("dataWithNotaId", dataWithNotaId);
    }

    const guardarCambios = async () => {
    if (!periodo || !asignaturaSeleccionada) {
        console.error("Por favor, selecciona un periodo y asignatura antes de guardar.");
        return;
    }
    // Validar que todas las notas estén dentro del rango 10 a 70
    const notasInvalidas = alumnos.some(alumno =>
        alumno.notas.some(nota => nota !== null && (nota < 10 || nota > 70))
    );

    if (notasInvalidas) {
        console.error("Todas las notas deben estar entre 10 y 70.");
        alert("Todas las notas deben estar entre 10 y 70.");
        return;
    }

    setGuardando(true);
    try {
        for (const alumno of alumnos) {
            alumno.notas.forEach(async (nota) => {
                if (nota !== null) { 
                    const calificacion = {
                        asignatura: +asignaturaSeleccionada,
                        periodo: periodo,
                        alumno: alumno.id,
                        calificacion: nota 
                    };
                    await handleSubmit(alumno.id, calificacion.calificacion);
                }
            });
        };
        setAlumnos(alumnos.map(alumno => ({
            ...alumno,
            notas: alumno.notas.map(() => null) 
        })));
    } catch (error) {
        console.error("Error al guardar notas:", error);
        console.error("Hubo un error al guardar las notas.");
    } finally {
        setGuardando(false);
    }
};

    const handleCursoChange = (e) => setCursoSeleccionado(e.target.value);
    const handleAsignaturaChange = (e) => setAsignaturaSeleccionada(e.target.value);
    const handleNombreFilterChange = (e) => setFilterNombre(e.target.value);
    const handlePeriodoChange = (e) => {
        const selectedPeriod = e.target.value;
        const currentYear = new Date().getFullYear();
        setPeriodo(selectedPeriod ? `${currentYear}-${selectedPeriod}` : "");
    };

    useEffect(() => {
        // Muestra la tabla solo si curso, asignatura y periodo están seleccionados
        if (cursoSeleccionado && asignaturaSeleccionada && periodo) {
            setMostrarTabla(true);
        } else {
            setMostrarTabla(false);
        }
    }, [cursoSeleccionado, asignaturaSeleccionada, periodo]);

        const columns = [
            { title: "Nombre del Alumno", field: "nombreCompleto", width: 500, responsive: 0 },
            ...evaluaciones.map((evaluacion, index) => ({
                title: evaluacion,
                field: `notas[${index}]`,
                width: 100,
                responsive: 0,
                render: (rowData) => (
                    <Input
                        type="number"
                        value={rowData.notas[index] ?? ''}
                        onChange={(e) => actualizarNota(rowData.id, index, e.target.value)}
                        className="w-20"
                    />
                )
            }))
        ];
    
    return (
        <div className="nota-page">
        <div className='main-container'>
            <div className='table-container'>
            <div className='top-table'>
                <h1 className="title-table">Gestión de Notas</h1>
                    <select value={cursoSeleccionado} onChange={handleCursoChange} className="p-2 border rounded">
                        <option value="">Selecciona un curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.idCurso} value={curso.idCurso}>
                                {curso.nombreCurso}
                            </option>
                        ))}
                    </select>
                    <select
                    value={asignaturaSeleccionada}
                    onChange={handleAsignaturaChange}
                    disabled={!cursoSeleccionado}
                >
                    <option value="">Selecciona una asignatura</option>
                    {asignaturas.map((asignatura) => (
                        <option key={asignatura.idAsignatura} value={asignatura.idAsignatura}>
                            {asignatura.nombreAsignatura}
                        </option>
                    ))}
                </select>
                <select
                        value={periodo ? periodo.split('-')[1] : ""}
                        onChange={handlePeriodoChange}
                        disabled={!asignaturaSeleccionada}
                        className="p-2 border rounded"
                    >
                        <option value="">Selecciona un periodo</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <Search value={filter} onChange={handleNombreFilterChange} placeholder="Filtrar por nombre" />
            </div>
            </div>
            
            {mostrarTabla && (
                <>
                    <Button 
                        onClick={crearEvaluacion} 
                        className="mb-5"
                        disabled={evaluacionCreada} // Desactiva el botón si ya se creó la evaluación
                    >
                        Crear Evaluación
                    </Button>               
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index}>{column.title}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alumnos
                                .filter(alumno => alumno.nombreCompleto.toLowerCase().includes(filter.toLowerCase()))
                                .map((alumno) => (
                                    <TableRow key={alumno.id}>
                                        <TableCell>{alumno.nombreCompleto}</TableCell>
                                        {alumno.notas.map((nota, index) => (
                                            <TableCell key={index}>
                                                <Input
                                                    type="number"
                                                    value={nota ?? ''}
                                                    min = "10"
                                                    max = "70"
                                                    onChange={(e) => actualizarNota(alumno.id, index, e.target.value)}
                                                    className="w-20"
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Button onClick={guardarCambios} className="mt-5" disabled={guardando}>
                        {guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </>
            )}
        </div>            
        </div>
    );
}

export default GestionNotas;