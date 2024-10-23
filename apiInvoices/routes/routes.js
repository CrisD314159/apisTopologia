import { Router } from "express";
import { getInvoiceById, getInvoices, payInvoice } from "../services/invoicesService.js";

export const router = Router();

router.get('/invoices/:id', getInvoices)
router.get('/invoice/:id', getInvoiceById)
router.put('/invoices/:id', payInvoice)