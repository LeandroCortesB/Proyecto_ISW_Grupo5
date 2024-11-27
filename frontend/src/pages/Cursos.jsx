import Table from '@components/Table';
import useCursos from '@hooks/cursos/useGetCursos.jsx';
import '@styles/cursos.css';
import personIcon from '@assets/PersonIcon.svg';
import { Link} from 'react-router-dom';
import '@styles/asignatura.css';
import Navbar from '@components/Navbar';

const Cursos = () => {
  const { cursos } = useCursos();

  const columns = [
    { title: "Nombre", field: "nombreCurso", width: 350, responsive: 0 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Cursos</h1>
        </div>
        <ul >
        <li className="move-right" >
        <Link 
        to="/asignatura"
        onClick={() => {
          Navbar.setMenuOpen(false);
          Navbar.addActiveClass();
        }}
      activeClassName="active">
          
          <img src={personIcon} alt="change" />
    </Link>
    </li>
    </ul>
        <Table
          data={cursos}
          columns={columns}
          initialSortName={'nombreCurso'}
        />
      </div>
    </div>
  );
};

export default Cursos;
