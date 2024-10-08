// Alternar entre os campos de probabilidade e probabilidade condicional
document.getElementById("tipoCalculo").addEventListener("change", (event) => {
  const tipoCalculo = event.target.value;
  const probabilidadeCampos = document.getElementById("probabilidadeCampos");
  const probabilidadeCondicionalCampos = document.getElementById(
    "probabilidadeCondicionalCampos"
  );

  // Mostrar ou esconder os campos específicos com base no tipo de cálculo
  if (tipoCalculo === "probabilidadeCondicional") {
    probabilidadeCampos.style.display = "none";
    probabilidadeCondicionalCampos.style.display = "block";
  } else {
    probabilidadeCampos.style.display = "block";
    probabilidadeCondicionalCampos.style.display = "none";
  }
});

// Evento para adicionar novos campos de evento dinamicamente (probabilidade normal)
document.getElementById("addEventoBtn").addEventListener("click", () => {
  const eventosContainer = document.getElementById("eventosContainer");

  const eventoHTML = document.createElement("div");
  eventoHTML.classList.add("evento");

  eventoHTML.innerHTML = `
    <label for="eventoNome">Nome do Evento:</label>
    <input type="text" class="eventoNome" placeholder="Nome do evento" required>
    <label for="qntEventos">Quantidade de Eventos Favoráveis:</label>
    <input type="number" class="qntEventos" placeholder="Quantidade de eventos favoráveis" required>
    <div>
    <label for="calcularComplementar">Calcular Complemento?</label>
    <input type="checkbox" class="calcularComplementar">
    </div>
    <button type="button" class="remover-evento">Remover Evento</button>
  `;

  // Botão para remover o evento
  eventoHTML
    .querySelector(".remover-evento")
    .addEventListener("click", function () {
      eventoHTML.remove();
    });

  eventosContainer.appendChild(eventoHTML);
});

// Evento para calcular as probabilidades
document.getElementById("calcularBtn").addEventListener("click", () => {
  const tipoCalculo = document.getElementById("tipoCalculo").value;
  const espacoAmostral = document.getElementById("espacoAmostral").value;

  if (tipoCalculo === "probabilidadeCondicional") {
    const interseccaoAB = document.getElementById("interseccaoAB").value;
    const eventoB = document.getElementById("eventoB").value;

    if (interseccaoAB && eventoB) {
      const probabilidadeCondicional = calcularProbabilidadeCondicional(
        interseccaoAB,
        eventoB
      );
      exibirResultadoCondicional(probabilidadeCondicional);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  } else {
    const eventos = [];
    const eventoNomes = document.getElementsByClassName("eventoNome");
    const qntEventos = document.getElementsByClassName("qntEventos");
    const calcularComplementoCheckboxes = document.getElementsByClassName(
      "calcularComplementar"
    );

    for (let i = 0; i < eventoNomes.length; i++) {
      const nome = eventoNomes[i].value;
      const quantidade = parseInt(qntEventos[i].value);

      if (!validarEspacoAmostral(espacoAmostral, quantidade)) {
        return;
      }

      const calcularComplementar = calcularComplementoCheckboxes[i].checked;
      if (nome && quantidade >= 0) {
        eventos.push({ nome, qntEventos: quantidade, calcularComplementar });
      }
    }

    if (eventos.length > 0 && espacoAmostral > 0) {
      exibirResultado(eventos, espacoAmostral);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  }
});

// Função para exibir o resultado da probabilidade condicional
function exibirResultadoCondicional(probabilidadeCondicional) {
  const resultadoContainer = document.getElementById("resultadoContainer");
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = `<p>A probabilidade condicional de A dado B é: ${probabilidadeCondicional.toFixed(
    2
  )}</p>`;
  resultadoContainer.style.display = "block";
}

// Função para exibir o resultado da probabilidade simples
function exibirResultado(eventos, espacoAmostral) {
  const resultadoContainer = document.getElementById("resultadoContainer");
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = ""; // Limpar resultados anteriores

  let somaProbabilidades = 0; // Para acumular a soma das probabilidades

  eventos.forEach((evento) => {
    const probabilidade = calcularProbabilidade(
      evento.nome,
      evento.qntEventos,
      espacoAmostral
    );
    somaProbabilidades += probabilidade; // Acumula a probabilidade de cada evento

    resultados.innerHTML += `<p>A probabilidade de ${
      evento.nome
    } ocorrer é: ${probabilidade.toFixed(2)}</p>`;

    // Verifica se o complemento individual deve ser calculado com base no checkbox
    if (evento.calcularComplementar) {
      const complemento = calcularComplementar(probabilidade);
      resultados.innerHTML += `<p>A probabilidade de ${
        evento.nome
      } não ocorrer (complemento) é: ${complemento.toFixed(2)}</p>`;
    }
  });

  // Verifica se a soma das probabilidades + complemento é igual a 1
  if (!validarSomaProbabilidades(somaProbabilidades)) {
    return; // Interrompe a execução se a soma não for válida
  }

  resultadoContainer.style.display = "block";
}
