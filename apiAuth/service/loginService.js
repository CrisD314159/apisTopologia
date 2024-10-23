import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import { getUser } from './databaseConn.js';
export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: 'Faltan campos que son obligatorios' });
    }
    const dbUser = await getUser(email)
    if(!dbUser){
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    const validPass = await bcryptjs.compare(password, dbUser.password);
    if(validPass){ // verificacion con la base de datos
      const accessToken =  generateAccessToken(dbUser)
      return res.status(201).json({ accessToken });
    }
    return res.json({ message: 'Invalid credentials' });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
    
  }
 
}

export function generateAccessToken(user){
  try {
    if(user){
      const usuario = {
        cedula:user.cedula,
        nombre:user.nombre,
        email:user.email,
      }
      const accessToken = jwt.sign({usuario}, process.env.JWT_SECRET, {expiresIn: '10s'});
      return accessToken;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}