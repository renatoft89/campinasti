require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
    process.exit(1);
  } 
  console.log('Conectado ao MySQL');
});

// Rota para salvar dados do formulário
app.post('/contato', (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios' });
  }

  const query = 'INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, telefone, mensagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      return res.status(500).json({ error: 'Erro ao salvar dados' });
    }

    res.json({ message: 'Mensagem salva com sucesso!', id: result.insertId });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
