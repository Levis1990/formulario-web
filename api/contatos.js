<<<<<<< HEAD
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM contatos ORDER BY id DESC"
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return res.status(500).json({ erro: "Erro ao buscar dados." });
  }
};
=======
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM contatos ORDER BY id DESC"
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return res.status(500).json({ erro: "Erro ao buscar dados." });
  }
};
>>>>>>> c3ef3c7 (Corrigindo api e script)
