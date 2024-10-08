// Função para exibir o resultado
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

  // Verifica se a soma das probabilidades é válida
  if (!validarSomaProbabilidades(somaProbabilidades)) {
    return; // Interrompe a execução se a soma não for válida
  }

  resultadoContainer.style.display = "block";
}
