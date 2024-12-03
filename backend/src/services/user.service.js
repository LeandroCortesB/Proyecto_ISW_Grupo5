"use strict";
import User from "../entity/user.entity.js";
import Hoja from "../entity/hoja.entity.js";
import deleteHojaService from "../services/hoja.service.js";
import createHojaService from "../services/hoja.service.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getUserService(query) {
  try {
    const { rut, id, email } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const { password, ...userData } = userFound;

    return [userData, null];
  } catch (error) {
    console.error("Error obtener el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}



export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay usuarios"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createUserService(body){
  try{
    const userRepository = AppDataSource.getRepository(User);
  
    const userFound = await userRepository.findOne({
      where: [{ id: body.id }, { rut: body.rut }],
    });

    if (userFound) return [null, "Ya existe un usuario con ese rut"];
  
    const nuevoUsuario = userRepository.create({
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      password: await encryptPassword(body.password),
      rol: body.rol,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    await userRepository.save(nuevoUsuario);
  
    if((rol = "alumno")||(rol = "Alumno")){
      createHojaService(nuevoUsuario.nombreCompleto,nuevoUsuario.rut,true,"");
    }

    return [nuevoUsuario, null];
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAlumnosService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const alumnos = await userRepository.find({ 
      where: [{ rol: "alumno" }], 
    });

    if (!alumnos || alumnos.length === 0) return [null, "No hay alumnos"];

    const alumnosData = alumnos.map(({ password, ...alumno }) => alumno);

    return [alumnosData, null];
  } catch (error) {
    console.error("Error al obtener a los alumnos:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function updateUserService(query, body) {
  try {
    const { id, rut, email } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const existingUser = await userRepository.findOne({
      where: [{ rut: body.rut }, { email: body.email }],
    });

    if (existingUser && existingUser.id !== userFound.id) {
      return [null, "Ya existe un usuario con el mismo rut o email"];
    }

    if (body.password) {
      const matchPassword = await comparePassword(
        body.password,
        userFound.password,
      );

      if (!matchPassword) return [null, "La contraseña no coincide"];
    }

    const dataUserUpdate = {
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      rol: body.rol,
      updatedAt: new Date(),
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      dataUserUpdate.password = await encryptPassword(body.newPassword);
    }

    await userRepository.update({ id: userFound.id }, dataUserUpdate);

    const userData = await userRepository.findOne({
      where: { id: userFound.id },
    });

    if (!userData) {
      return [null, "Usuario no encontrado después de actualizar"];
    }

    const { password, ...userUpdated } = userData;
    
    //aca se crea una hoja asociada al usuario en caso de que este sea un alumno
    const hojaRepository = AppDataSource.getRepository(Hoja);

    p=hojaRepository.findOne({ where: [{ rut: rut }], })

    if(p=null){
      if(rol="alumno"){
        hojaRepository.save(
          hojaRepository.create({
            nombreCompleto: body.nombreCompleto,
            rut: body.rut,
            buena:true,
            updatedAt: new Date(),
          })
        )
      }      
    }

    return [userUpdated, null];
  } catch (error) {
    console.error("Error al modificar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteUserService(query) {
  try {
    const { id, rut, email } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    if (userFound.rol === "administrador") {
      return [null, "No se puede eliminar un usuario con rol de administrador"];
    }

    const hojaRepository = AppDataSource.getRepository(Hoja);

    const hojaFound = await hojaRepository.findOne({
      where: [{ idHoja: Hoja.idHoja }, { rut: rut }],
    });

    deleteHojaService(hojaFound);
    const userDeleted = await userRepository.remove(userFound);

    const { password, ...dataUser } = userDeleted;

    return [dataUser, null];
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

