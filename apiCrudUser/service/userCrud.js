import { db } from "../db/dbConnection.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function createUser(req, res) {
  const {cedula, nombre, direccion, telefono, estrato, email, password } = req.body
  if (!cedula || !nombre || !direccion || !telefono || !estrato || !email || !password) {
    return res.status(400).json({message: "Faltan campos"}) 
  }
  const hashedPassword = await bcryptjs.hash(password, 10)
  const user = await db`SELECT * FROM Usuario WHERE email = ${email}`
  if (user.length) {
    return res.status(400).json({message: "Usuario ya existe"})
  }
  try {
    await db`INSERT INTO Usuario (cedula, nombre, direccion, telefono, estrato, email, password) VALUES (${cedula}, ${nombre}, ${direccion}, ${telefono}, ${estrato}, ${email}, ${hashedPassword})`
    return res.status(200).json({message: "Usuario creado"})
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
  }

}

export async function getUser(req, res) {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({message: "Falta id"}) 
  }
  try {
    const response = await db`SELECT cedula, nombre, direccion, telefono, estrato, email FROM Usuario WHERE cedula = ${id}`
    return res.status(200).json(response[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
  }

}

export async function updateUser(req, res) {
  const {nombre, direccion, telefono, estrato, password } = req.body
  if(!nombre || !direccion || !telefono || !estrato || !password) {
    return res.status(400).json({message: "Faltan campos obligatorios"}) 
  }
  const user = await db`SELECT * FROM Usuario WHERE cedula = ${req.body.cedula}`
  if (!user.length) {
    return res.status(404).json({message: "Usuario no encontrado"})
  }
  try {
    const response = await db.begin(async db=>{
      await db`UPDATE Usuario SET nombre = ${nombre}, direccion = ${direccion}, telefono = ${telefono}, estrato = ${estrato} WHERE cedula = ${req.body.cedula}`
      if (password) {
        const hashedPassword = await bcryptjs.hash(password, 10)
        await db`UPDATE Usuario SET password = ${hashedPassword} WHERE cedula = ${req.body.cedula}`
      }
      return true
    })

    if (response) {
      return res.status(200).json({message: "Usuario actualizado"})
    }else{
      return res.status(500).json({message: "Error al actualizar usuario"})
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
    
  }

}

export async function deleteUser(req, res) {
  const {cedula, email} = req.body
  if (!cedula || !email) {
    return res.status(400).json({message: "Faltan campos"}) 
  }
  try {
    await db`DELETE FROM Usuario WHERE cedula = ${cedula} AND email = ${email}`
    return res.status(200).json({message: "Usuario eliminado"})
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
  }

}


export async function authUser(req, res, next){
 const {authorization} = req.headers
  if (!authorization) {
    return res.status(401).json({message: "No autorizado"})
  }
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error(error.message)
    res.status(401).json({message: "No autorizado"})
  }
}


export async function getAllUsers(req, res){
  try {
    const response = await db`SELECT * FROM Usuario`
    return res.status(200).json(response)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
  }
}

