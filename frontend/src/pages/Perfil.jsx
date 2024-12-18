import Table from '@components/Table';
import useAsignaturas from '@hooks/asignaturas/useGetAsignaturas.jsx';
import {useAuth} from '@context/AuthContext.jsx';
import '@styles/perfil.css';

const Perfil = () => {
    const { user } = useAuth();
    const { asignaturas } = useAsignaturas();
    console.log(asignaturas);
    
    const asignaturasdelalumno = asignaturas.filter(
        asignatura => asignatura.idCurso === user.curso.idCurso);
    const columns = [
        { title: "Nombre", field: "nombreAsignatura", width: 350, responsive: 0 },
        { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
    ];
    
    return (
        <div className='main-container'>
        <div className='table-container'>
            <div className='top-table'>
            <h1 className='title-table'>Perfil</h1>
            </div>
            <div className='perfil-container'>
            <div className='perfil-info'>
                <p><strong>Nombre:</strong> {user.nombreCompleto}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
            </div>
            <h1 className='title-table'>Asignaturas a las que perteneces</h1>
            <Table            
                data={asignaturasdelalumno}
                columns={columns}
                initialSortName={'nombreAsignatura'}
            />
            </div>
        </div>
        </div>
    );
    };

export default Perfil;
    