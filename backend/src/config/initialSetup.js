"use strict";
import User from "../entity/user.entity.js";
import Curso from "../entity/curso.entity.js";
import Asignatura from "../entity/asignatura.entity.js";
import Asistencia from "../entity/asistencia.entity.js";
import Nota from "../entity/nota.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const cursoRepository = AppDataSource.getRepository(Curso);

    const AsistenciaRepository = AppDataSource.getRepository(Asistencia);

    const NotaRepository = AppDataSource.getRepository(Nota);

    const AsignaturaRepository = AppDataSource.getRepository(Asignatura);

    const count = await userRepository.count();

    if (count > 0) return;

    const apoderado1 = userRepository.create({
      nombreCompleto: "Ana María Carrasco Rivera",
      rut: "14.325.678-3",
      email: "apoderado1.2024@gmail.cl",
      password: await encryptPassword("apoderado1234"),
      rol: "apoderado",
    });
    const apoderado2 = userRepository.create({
      nombreCompleto: "Luis Alberto Fernández González",
      rut: "13.567.890-9",
      email: "apoderado2.2024@gmail.cl",
      password: await encryptPassword("apoderado1234"),
      rol: "apoderado",
    });
    const apoderado3 = userRepository.create({
      nombreCompleto: "Juan Alberto Torres Demacia",
      rut: "12.577.890-9",
      email: "apoderado3.2024@gmail.cl",
      password: await encryptPassword("apoderado1234"),
      rol: "apoderado",
    });
    const savedApoderado1 = await userRepository.save(apoderado1);
    const savedApoderado2 = await userRepository.save(apoderado2);
    const savedApoderado3 = await userRepository.save(apoderado3);

    const curso1 = cursoRepository.create({
      nombreCurso: "1A",
    });

    const curso2 = cursoRepository.create({
      nombreCurso: "1B",
    });

    const curso3 =cursoRepository.create({
      nombreCurso: "2A",
    });


    const curso4 =cursoRepository.create({
      nombreCurso: "2B",
    });


    const curso5 = cursoRepository.create({
      nombreCurso: "3A",
    });

    const curso6 =cursoRepository.create({
      nombreCurso: "3B",
    });


    const asignatura1 =AsignaturaRepository.create({
      nombreAsignatura: "Matemáticas",
      descripcion: "Curso de la profesora maria",
      idCurso: 1,
    });


    const asignatura2 =AsignaturaRepository.create({
      nombreAsignatura: "Lenguaje",
      descripcion: "Curso de la profesora maria",
      idCurso: 1,
    });

    const savedCurso1 = await cursoRepository.save(curso1);
    const savedCurso2 = await cursoRepository.save(curso2);
    const savedCurso3 = await cursoRepository.save(curso3);
    const savedCurso4 = await cursoRepository.save(curso4);
    const savedCurso5 = await cursoRepository.save(curso5);
    const savedCurso6 = await cursoRepository.save(curso6);
    const savedAsignatura1 = await AsignaturaRepository.save(asignatura1);
    const savedAsignatura2 = await AsignaturaRepository.save(asignatura2);

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador2024@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "profesor",
        })
      ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
            rut: "20.630.735-8",
            email: "usuario2.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "alumno",
            apoderado: savedApoderado1
          }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "alumno",
          apoderado: savedApoderado2
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "profesor",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "profesor",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "alumno",
          apoderado: savedApoderado3
        }),
      ),
      
      AsistenciaRepository.save(
        AsistenciaRepository.create({
          fecha: "2024-11-26",
          asistio: true,
          alumno: 2,
          asignatura: asignatura1,
        }), 
      ),
      NotaRepository.save(
        NotaRepository.create({
          calificacion: 10,
          periodo: "2023-2",
          alumno: 2,
          asignatura: asignatura1,
        }),
      ),

    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createUsers };