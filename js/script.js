// Array de dados de origem
const projetos = [
  {
    titulo: "Encontro entre Gerações",
    descricao: "Encontros para promover a convivência, a troca de experiências e a integração entre diferentes gerações."
  },
  {
    titulo: "Oficinas de Aprendizado",
    descricao: "Atividades e oficinas para incentivar novos aprendizados e o desenvolvimento de habilidades."
  },
  {
    titulo: "Ações de Solidariedade",
    descricao: "Ações voltadas ao apoio, à inclusão social e à solidariedade com pessoas idosas."
  }
];

// Função para aplicar as máscaras nos campos apenas quando eles existirem no DOM
function inicializarMascaras() {
  const inputCpf = document.getElementById("cpf");
  const inputTelefone = document.getElementById("telefone");
  const inputCep = document.getElementById("cep");

  if (inputCpf) {
    inputCpf.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      this.value = valor;
    });
  }

  if (inputTelefone) {
    inputTelefone.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
      valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
      this.value = valor;
    });
  }

  if (inputCep) {
    inputCep.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
      this.value = valor;
    });
  }
}

// Função de navegação e renderização de templates
function navegar(pagina) {
  const conteudo = document.getElementById("conteudo");
  if (!conteudo) return;

  if (pagina === "inicio") {
    conteudo.innerHTML = `
      <h1>Conectando Gerações, Transformando Vidas</h1>
      <img 
        src="../imagens/conecta-idade.webp"
        alt="Conecta Idade"
        class="imagem-principal"
      >
    `;
  }

  if (pagina === "projetos") {
    // Uso do .map() + .join() para transformar a estrutura de dados em HTML
    const cards = projetos.map(projeto => `
      <div class="card">
        <h2>${projeto.titulo}</h2>
        <p>${projeto.descricao}</p>
      </div>
    `).join("");

    conteudo.innerHTML = `
      <h1>Nossos projetos</h1>
      <p>Conheça os projetos da Conecta Idade.</p>
      <div class="container-cards">
        ${cards}
      </div>
    `;
  }

  if (pagina === "cadastro") {
    conteudo.innerHTML = `
      <h1>Faça parte da Conecta Idade</h1>
      <p>Preencha o formulário para participar.</p>
      <form id="form-cadastro">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" placeholder="000.000.000-00" maxlength="14"><br><br>

        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" placeholder="(00) 00000-0000" maxlength="15"><br><br>

        <label for="cep">CEP:</label>
        <input type="text" id="cep" placeholder="00000-000" maxlength="9"><br><br>

        <button type="submit">Enviar</button>
      </form>
    `;

    // Vincula os escutadores de máscara aos campos recém-inseridos na tela
    inicializarMascaras();
  }
}