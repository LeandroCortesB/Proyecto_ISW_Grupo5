import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useGetHoja from '@hooks/hojas/useGetHoja';
import { showMalaHojaAlert } from '@helpers/sweetAlert.js';
import '@styles/home.css';

const Home = () => {
  const { user } = useAuth();
  const { getHoja } = useGetHoja(); 

  useEffect(() => {
    const fetchHoja = async () => {
      if (user.rol === 'Alumno') {
        try {
          const hoja = await getHoja(user.rut); 
          if (hoja && !hoja.buena) {
            showMalaHojaAlert(
              'Advertencia',
              `Hola ${user.nombreCompleto}, tu última hoja actualizada el ${new Date(
                hoja.updatedAt
              ).toLocaleString()} tiene observaciones negativas.`
            );
          }
        } catch (error) {
          console.error('Error al obtener la hoja:', error);
        }
      }
    };

    fetchHoja();
  }, [user, getHoja]);

  return (
    <div className="home-container">
      <div className="welcome-card">
        <img
          src="https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg"
          alt="Bienvenido"
          className="welcome-image"
        />
        <h1>¡Bienvenido/a, {user.nombreCompleto}!</h1>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p>¡Esperamos que tengas un día fantástico! 🐈</p>
      </div>
    </div>
  );
};

export default Home;
