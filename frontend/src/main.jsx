import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Alumnos from "@pages/Alumnos";
import Users from "@pages/Users";
import Register from "@pages/Register";
import Error404 from "@pages/Error404";
import Root from "@pages/Root";
import Cursos from "@pages/Cursos";
import Perfil from "@pages/Perfil";
import Nota from "@pages/Nota";
import ProtectedRoute from "@components/ProtectedRoute";
import "@styles/styles.css";
import Asignaturas from "./pages/asignatura";
import Asistencias from "./pages/Asistencia";
import RegistrarAsistencia from "./pages/RegistrarAsistencia";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/nota",
        element: <Nota />,
      },
      {
        path: "/asignatura/:idCurso",
        element: <Asignaturas />,
      },
      {
        path: "/asistencias",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "profesor"]}>
            <Asistencias /> {/* Nueva ruta para Asistencias */}
          </ProtectedRoute>
        ),
      },
      {
        path: "/asistencias/registrar",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "profesor"]}>
            <RegistrarAsistencia />
          </ProtectedRoute>
        ),
      },
      {
        path: "/alumnos",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "profesor"]}>
            <Alumnos />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "profesor"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cursos",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "profesor"]}>
            <Cursos />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
