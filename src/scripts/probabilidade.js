// Função para calcular a probabilidade de um evento
function calcularProbabilidade(nomeEvento, qntEventos, espacoAmostral) {
  if (espacoAmostral === 0) {
    throw new Error(
      `Erro no evento ${nomeEvento}: O espaço amostral não pode ser zero.`
    );
  }

  if (qntEventos < 0) {
    throw new Error(
      `Erro no evento ${nomeEvento}: A quantidade de eventos favoráveis não pode ser negativa.`
    );
  }

  if (qntEventos > espacoAmostral) {
    throw new Error(
      `Erro no evento ${nomeEvento}: Os eventos não podem exceder o espaço amostral.`
    );
  }

  return qntEventos / espacoAmostral;
}

// Função para calcular o complemento da soma das probabilidades
function calcularComplementar(probabilidade) {
  return 1 - probabilidade;
}

// Função para validar o espaço amostral e a quantidade de eventos favoráveis
function validarEspacoAmostral(espacoAmostral, qntEventos) {
  if (espacoAmostral <= 0) {
    alert("O espaço amostral deve ser maior que zero.");
    return false;
  }
  if (qntEventos > espacoAmostral) {
    alert(
      "A quantidade de eventos favoráveis não pode ser maior que o espaço amostral."
    );
    return false;
  }
  return true;
}

// Função para validar se a soma das probabilidades + complemento é igual a 1
function validarSomaProbabilidades(somaProbabilidades) {
  const complementoTotal = calcularComplementar(somaProbabilidades);

  // Verifica se o complemento é negativo ou se a soma ultrapassou 1
  if (complementoTotal < 0) {
    alert(
      `Erro: A soma total das probabilidades excedeu 1. Soma atual: ${somaProbabilidades.toFixed(
        4
      )}`
    );
    return false;
  }

  const somaTotal = somaProbabilidades + complementoTotal;

  // Verifica se a soma das probabilidades + complemento é igual a 1 (com tolerância para arredondamento)
  if (Math.abs(somaTotal - 1) > 0.0001) {
    alert(
      `Erro: A soma total das probabilidades (incluindo o complemento) deve ser igual a 1. Soma atual: ${somaTotal.toFixed(
        4
      )}`
    );
    return false;
  }
  return true;
}
