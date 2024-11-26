import {useAuth} from '../context/authContext';
import '@styles/home.css';

const Home = () => {
  const { user } = useAuth(); 

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
