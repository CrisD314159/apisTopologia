import {db} from '../db/dbConnection.js'
export async function getInvoices(req, res) {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({message: "Falta id"}) 
  }
  try {
    const response = await db`SELECT * FROM Recibo WHERE cedula_cliente = ${id}`
    return res.status(200).json(response)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
  }

}

export async function getInvoiceById(req, res) {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({message: "Falta id"}) 
  }
  try {
    const response = await db`SELECT * FROM Recibo WHERE codigo = ${id}`
    return res.status(200).json(response[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message: error})
  }

}

export async function payInvoice(req, res) {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({message: "Faltan campos"}) 
  }
  try {
    await db`UPDATE Recibo SET paid = 1 WHERE codigo = ${id} `
    return res.status(200).json({message: "Recibo Pagado"})
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




