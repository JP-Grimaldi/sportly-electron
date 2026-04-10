import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import userRouter from './routes/user.router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient()


const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);

app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));