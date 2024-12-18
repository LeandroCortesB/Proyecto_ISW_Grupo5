import React, { useState, useMemo, useEffect } from 'react';
import { getAsignaturasByCurso } from "@services/asignatura.service.js";
import { getUsersByCurso } from "@services/user.service.js";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button"
import useCursos from '@hooks/cursos/useGetCursos';
import useNotas from '@hooks/nota/useGetNotas.jsx';
import useDeleteNota from '@hooks/nota/useDeleteNota';
import useEditNota from '@hooks/nota/useEditNota';
import PopupN from '@components/PopupN';
import DeleteIcon from '@assets/deleteIcon.svg';
import UpdateIcon from '@assets/updateIcon.svg';
import Search from '@components/Search';
import '@styles/nota.css';

const VerNotas = () => {
    const { cursos } = useCursos();
    const [cursoSeleccionado, setCursoSeleccionado] = useState("");
    const { notas, fetchNotas, setNotas } = useNotas();
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
    const [alumnos, setAlumnos] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [periodo, setPeriodo] = useState("");
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataNota,
        setDataNota
    } = useEditNota(setNotas);

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
    console.log("asignatura", asignaturaSeleccionada);

    const { handleDelete } = useDeleteNota(fetchNotas, setDataNota);

    const notasPorAlumno = useMemo(() => {
        return alumnos.map(alumno => {
            const notasAlumno = notas
                .filter(nota => 
                    nota.alumno.id === alumno.id && 
                    nota.asignatura.idAsignatura === parseInt(asignaturaSeleccionada)
                )
                .sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion))
                .map((nota, index) => ({
                    ...nota,
                    evaluacionNumero: index + 1
                }));
            return {
                ...alumno,
                notas: notasAlumno
            };
        });
    }, [alumnos, notas, asignaturaSeleccionada]);

    const filteredData = useMemo(() => {
        return notasPorAlumno.filter(alumno => 
            alumno.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [notasPorAlumno, searchTerm]);
    

    const handleCursoChange = (e) => setCursoSeleccionado(e.target.value);
    const handleAsignaturaChange = (e) => setAsignaturaSeleccionada(e.target.value);
    const handleNombreFilterChange = (e) => setSearchTerm(e.target.value);
    const handlePeriodoChange = (e) => {
        const selectedPeriod = e.target.value;
        const currentYear = new Date().getFullYear();
        setPeriodo(selectedPeriod ? `${currentYear}-${selectedPeriod}` : "");
    };

    useEffect(() => {
        if (cursoSeleccionado && asignaturaSeleccionada && periodo) {
            setMostrarTabla(true);
        } else {
            setMostrarTabla(false);
        }
    }, [cursoSeleccionado, asignaturaSeleccionada, periodo]);

    return (
        <div className="nota-page"> 
            <div className="main-container">
                <div className="table-container">     
                    <div className="top-table">
                        <h1 className="title-table">Ver Notas</h1>
                    <Link to= "/nota">
                    <Button className="mb-5">Crear Evaluación</Button>
                    </Link>
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
                        <Search value={searchTerm} onChange={handleNombreFilterChange} placeholder="Filtrar por nombre" />
                    </div>
                </div>
                {mostrarTabla && (
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre del Alumno</th>
                                    <th>Notas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((alumno) => (
                                    <tr key={alumno.id}>
                                        <td>{alumno.nombreCompleto}</td>
                                        <td>
                                            <div className="notas-container">
                                                {alumno.notas.map((nota) => (
                                                    <div key={nota.idNota} className="nota-item">
                                                        <span className="evaluacion"><strong>E{nota.evaluacionNumero}:</strong></span>
                                                        <span className="calificacion">{nota.calificacion}</span>
                                                        <button 
                                                            onClick={() => handleClickUpdate(nota)}
                                                            className="edit-button"
                                                        ><img src={UpdateIcon} alt="edit" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete([nota.idNota])}
                                                            className="delete-button"
                                                        ><img src={DeleteIcon} alt="delete" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <PopupN
                show={isPopupOpen} 
                setShow={setIsPopupOpen} 
                data={dataNota} 
                action={handleUpdate}
            />
        </div>
    );
}

export default VerNotas;

