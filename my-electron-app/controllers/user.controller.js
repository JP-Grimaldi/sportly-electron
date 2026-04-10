import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Email ou senha inválidos!' });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: cliente.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email
      }
    });

  } catch (err) {
    console.error("ERRO LOGIN:", err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};



export const criarUsuario = async (req, res) => {
  try {

    const senhaHash = await bcrypt.hash(req.body.senha, 10);

    await prisma.cliente.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        senha: senhaHash
      }
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });

  } catch (error) {
    console.error("ERRO CREATE:", error);

    res.status(500).json({
      error: "Erro ao cadastrar usuário",
      detalhe: error.message
    });
  }
};

export const listarUsuarios = async (req, res) => {
  let cliente = []
  if (req.query) {
    cliente = await prisma.cliente.findMany({
      where: {
        nome: req.query.nome,
        email: req.query.email,
        telefone: req.query.telefone,
        cpf: req.query.cpf
      }
    })
  } 
  else {
    cliente = await prisma.cliente.findMany()
  }
  res.status(200).json(cliente)
};

export const deletarUsuario = async (req, res) => {
  await prisma.cliente.delete({
    where: {
      id_cliente: parseInt(req.params.id, 10)
    }
  })
  res.status(200).json({ message: "Usuário deletado com sucesso!"})
};

export const atualizarUsuarios = async (req, res) => {
    await prisma.cliente.update({
    where: {
      id_cliente: parseInt(req.params.id, 10)
    },
    data: {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      cpf: req.body.cpf
    }
  })
  res.status(201).json(req.body)
}