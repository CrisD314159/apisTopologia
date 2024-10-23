import { Router } from "express";
import { sendMail } from "../service/emailService.js";

export const router = Router();

router.post('/send-email', async (req, res)=>{
  const { email, message, subject } = req.body
  if(!email || !message || !subject) {
    res.status(400).json({message: 'Missing required fields'})
  }
  try {
    await sendMail(email, message, subject)
    res.status(200).json({message: 'Email sent'})
    
  } catch (error) {
    res.status(500).json({message: 'Internal server error'})
    
  }
})