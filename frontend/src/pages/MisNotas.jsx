import React, { useState, useEffect, useMemo } from 'react';
import { getNotas } from '@services/nota.service.js';
import { useAuth } from "@context/AuthContext";

const MisNotas = () => {
    const [studentNotas, setStudentNotas] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchNotas = async () => {
            if (!user || !user.id) {
                setError("No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const notasData = await getNotas();
                console.log("All notasData", notasData);
                
                const filteredNotas = notasData.filter(nota => nota.alumno.id === user.id);
                
                setStudentNotas(filteredNotas);
            } catch (error) {
                console.error("Error al cargar las notas:", error);
                setError("Hubo un problema al cargar tus notas. Por favor, intenta de nuevo más tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotas();
    }, [user]);

    const notasPorAsignatura = useMemo(() => {
        const groupedNotas = {};
        studentNotas.forEach(nota => {
            if (!groupedNotas[nota.asignatura.idAsignatura]) {
                groupedNotas[nota.asignatura.idAsignatura] = {
                    nombreAsignatura: nota.asignatura.nombreAsignatura,
                    notas: []
                };
            }
            groupedNotas[nota.asignatura.idAsignatura].notas.push(nota);
        });

        Object.values(groupedNotas).forEach(asignatura => {
            asignatura.notas.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
            asignatura.notas.forEach((nota, index) => {
                nota.evaluacionNumero = index + 1;
            });
        });

        return Object.values(groupedNotas);
    }, [studentNotas]);

    if (isLoading) {
        return <div className="loading-message">Cargando tus notas...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="student-grades-view">
            <h2>Mis Notas</h2>
            {notasPorAsignatura.length === 0 ? (
                <p>No hay notas disponibles.</p>
            ) : (
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Asignatura</th>
                            <th>Notas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notasPorAsignatura.map((asignatura) => (
                            <tr key={asignatura.nombreAsignatura}>
                                <td>{asignatura.nombreAsignatura}</td>
                                <td>
                                    <div className="notas-container">
                                        {asignatura.notas.map((nota) => (
                                            <div key={nota.idNota} className="nota-item">
                                                <span className="evaluacion"><strong>E{nota.evaluacionNumero}:</strong></span>
                                                <span className="calificacion">{nota.calificacion}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MisNotas;

