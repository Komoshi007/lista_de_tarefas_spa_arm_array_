// Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const tarefas = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Lista de Tarefas</h1>
        <p>
          Este é um exemplo simples de SPA feita com HTML, CSS e JavaScript.
          A navegação acontece sem recarregar a página.
        </p>

        <p>
          As tarefas cadastradas ficam temporariamente guardadas em um array JavaScript.
        </p>

        <div class="contador">
          Tarefas cadastradas nesta sessão: <strong>${tarefas.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar tarefa</button>
          <button class="botao secundario" id="btnVerTarefas">Ver tarefas</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerTarefas")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Tarefa</h1>

        <form id="formTarefa">
          <div class="campo">
            <label for="titulo">Título</label>
            <input id="titulo" type="text" placeholder="Digite o título da tarefa" required />
          </div>

          <div class="campo">
            <label for="descricao">Descrição</label>
            <input id="descricao" type="text" placeholder="Digite a descrição da tarefa" required />
          </div>

          <div class="campo">
            <label for="data">Data</label>
            <input id="data" type="date" placeholder="Digite a data" required />
          </div>

          <button class="botao" type="submit">Salvar tarefa</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formTarefa").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const titulo = document.querySelector("#titulo").value.trim();
        const descricao = document.querySelector("#descricao").value.trim();
        const data = document.querySelector("#data").value;

        tarefas.push({
          titulo,
          descricao,
          data
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Tarefa cadastrada com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de Tarefas</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de tarefas.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (tarefas.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhuma tarefa cadastrada ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      tarefas.forEach((tarefa, indice) => {
        linhas += `
          <tr>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.descricao}</td>
            <td>${tarefa.data}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>título</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          tarefas.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Este exemplo foi criado para demonstrar uma Single Page Application simples.
        </p>
        <p>
          Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
          o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
        </p>
        <p>
          O projeto também demonstra cadastro em array, manipulação do DOM,
          eventos de clique, envio de formulário, listagem e exclusão.
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();