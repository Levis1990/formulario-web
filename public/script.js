const form = document.getElementById("form-contato");
const resposta = document.getElementById("resposta");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  try {
    const requisicao = await fetch("/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, mensagem })
    });

    const resultado = await requisicao.json();

    if (requisicao.ok) {
      resposta.textContent = resultado.mensagem;
      form.reset();
    } else {
      resposta.textContent = resultado.erro || "Erro ao enviar.";
    }
  } catch (erro) {
    resposta.textContent = "Erro de conexão com o servidor.";
    console.error(erro);
  }
});
