const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para ler JSON
app.use(express.json());

// Middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Conectar ao banco SQLite
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    mensagem TEXT NOT NULL
  )
`);

// Rota para receber os dados do formulário
app.post("/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)";
  db.run(sql, [nome, email, mensagem], function (err) {
    if (err) {
      console.error("Erro ao salvar no banco:", err.message);
      return res.status(500).json({ erro: "Erro ao salvar os dados." });
    }

    res.status(201).json({
      mensagem: "Dados salvos com sucesso!",
      id: this.lastID,
    });
  });
});

// Rota para listar os contatos salvos
app.get("/contatos", (req, res) => {
  db.all("SELECT * FROM contatos ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar dados:", err.message);
      return res.status(500).json({ erro: "Erro ao buscar dados." });
    }

    res.json(rows);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
