const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO contatos (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING id",
      [nome, email, mensagem],
    );

    return res.status(201).json({
      mensagem: "Dados salvos com sucesso!",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Erro ao salvar no banco:", error);
    return res.status(500).json({ erro: "Erro ao salvar os dados." });
  }
};
