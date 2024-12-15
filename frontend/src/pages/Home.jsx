import { useEffect } from 'react';
import { useAuth } from '@context/AuthContext';
import useGetHojas from '@hooks/hojas/useGetHojas';
import { showMalaHojaAlert } from '@helpers/sweetAlert.js';
import { format as formatTempo } from "@formkit/tempo";
import '@styles/home.css';

const Home = () => {
  const { user } = useAuth();
  const { hojas, fetchHojas , setHojas }= useGetHojas(user.rut); 

  useEffect(() => {
    const fetchHojas = async () => {
      if (user.rol === 'alumno') {
        try {
  
          function hojasmal(a) {
            const now = new Date();
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(now.getDate() - 7);
          
            const formattedTenDaysAgo = formatTempo(tenDaysAgo, "DD-MM-YYYY");
          
            return a.filter(
              (hoja) => (!hoja.buena && ((hoja.createdAt) >= formattedTenDaysAgo))
            );
          }
          
          let filtradas = (hojasmal(hojas));
          
          console.log("aca sa",filtradas);

          if (filtradas.length>=1) {
            showMalaHojaAlert(
              'Advertencia',
              `Hola ${user.nombreCompleto}, tiene una anotacion negativa de el dia ${filtradas[0].createdAt}.`
            );
          }
        } catch (error) {
          console.error('Error al obtener la hoja:', error);
        }
      }
    };

    fetchHojas();
  }, [user, hojas]);

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
