const averageValue = 52; // Valor da média

// Função feita para organizar o conjunto de dados dos meses que seram formados no gráfico, de forma que se encontrar dados na tabelaDados adiciona para aquele mês,
// caso não coloca com 0 na tabela
function prepararDadosGrafico() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  let pontos = meses.map((mes) => {
    const item = tabelaDados.find((dado) => dado.mes === mes);
    return { x: mes, y: item ? item.energiaGerada : 0 };
  });

  return pontos;
}

// Função para gerar o gráfico, utiliza dos dados fornecidos pela função de preparar os dados que retorna um array que serão as barras do gráfico
function gerarGrafico() {
  const pontosGrafico = prepararDadosGrafico(); // Obtém os dados formatados

  // Criação do gráfico
  const chart = new JSC.Chart("chartContainer", {
    type: "column",
    title: {
      position: "center",
      label: {
        text: "Energia gerada por mês",
        style_fontSize: 25,
        backgroundColor: "#979899",
      },
    },
    xAxis: {
      label: {
        text: "Mês",
        backgroundColor: "#979899",
      },
    },
    yAxis: {
      label: {
        text: "Energia em kWh/mês",
        backgroundColor: "#979899",
      },
    },
    series: [
      {
        name: "Energia",
        points: pontosGrafico,
      },
      {
        name: "Média fixa esperada",
        points: [
          { x: "Janeiro", y: averageValue },
          { x: "Dezembro", y: averageValue },
        ],
        type: "line",
        color: "#FF0000",
        lineWidth: 2,
      },
    ],
  });
}

// Chamo está função para carregar quando abrir a tela
window.onload = gerarGrafico;

// Gráfico de pizza/donut que mostra energia gerada vs energia gastas em porcentagem, seus valores de y são 0 pois serão alterados de forma automatica a parti de dados da tabela
const chartDonut = new JSC.Chart("donutContainer", {
  debug: true,
  defaultSeries: { type: "pie" },
  chartArea_boxVisible: false,
  title: {
    position: "center",
    label: {
      text: "Energia gerada vs Energia gasta (%)",
      style_fontSize: 25,
      backgroundColor: "#979899",
    },
  },
  legend_visible: false,
  defaultSeries_mouseTracking_enabled: false,
  defaultPoint: {
    label: {
      text: "%name<br/><b>%percentOfTotal%</b><br/>",
      placement: "outside",
      style_fontSize: 14,
    },
  },
  series: [
    {
      name: "Energia",
      points: [
        {
          name: "Gerada",
          y: 0,
        },
        {
          name: "Gasta",
          y: 0,
        },
      ],
    },
  ],
});

// Função para atualizar o gráfico donut, seguindo a regra de pegar o ultimo mês e ver em porcentagem o quanto a energia gerada do mês cobre a energia gasta da empresa, caso a energia gerada
// ultrapasse a energia gasta aparece somenete 100% caso não aparece devidamente a porcentagem referente a eles
function atualizarGraficoDonut() {
  const energiaGerada = tabelaDados[0].energiaGerada;
  const energiaGasta = tabelaDados[0].energiaGasta;
  const porcentagemGerada = (energiaGerada * 100) / energiaGasta;

  if (energiaGerada > energiaGasta) {
    console.log(porcentagemGerada);
    chartDonut.series(0).points([
      {
        name: "Gerada",
        y: porcentagemGerada,
      },
      {
        name: "Restante",
        y: 0,
      },
    ]);
  } else {
    // Atualiza os pontos do gráficos que antes estavam como 0 no gráfico de pizza
    chartDonut.series(0).points([
      {
        name: "Gerada",
        y: porcentagemGerada,
      },
      {
        name: "Resto",
        y: 100 - porcentagemGerada,
      },
    ]);
  }
}

// Valor fixo que usamos para o preco do kWh
const precoKwh = 0.656;

// Valor fixo da média esperada de energia gerada
const mediaEsperada = 52;

// Dados da tabela
const tabelaDados = [
  {
    mes: "Junho",
    energiaGerada: 52,
    energiaGasta: 72,
    custoInvestimento: 1250,
  },
  { mes: "Maio", energiaGerada: 52, energiaGasta: 46, custoInvestimento: 1200 },
  {
    mes: "Abril",
    energiaGerada: 51,
    energiaGasta: 43,
    custoInvestimento: 1150,
  },
  {
    mes: "Março",
    energiaGerada: 49,
    energiaGasta: 42,
    custoInvestimento: 1100,
  },
  {
    mes: "Fevereiro",
    energiaGerada: 44,
    energiaGasta: 38,
    custoInvestimento: 1050,
  },
  {
    mes: "Janeiro",
    energiaGerada: 46,
    energiaGasta: 55,
    custoInvestimento: 1200,
  },
];

// Função para calcular energia total gerada
function calcularEnergiaTotalGerada() {
  let energiaTotalGerada = 0;
  tabelaDados.forEach((item) => {
    energiaTotalGerada += item.energiaGerada;
  });
  return energiaTotalGerada;
}

// Função para calcular o potencial, segue a lógica de pegar a média esperada de energia e fazer uma regra de três com a energia gerada do último mês para termos assim um potencial
// podendo saber se ela gerou mais ou menos que o esperado em termos de %
function calcularPotencial() {
  const ultimaEnergiaGerada = tabelaDados[0].energiaGerada; // Pega o último valor de energia gerada
  const potencial = (ultimaEnergiaGerada / mediaEsperada) * 100; // Regra de 3
  return potencial;
}

// Função para atualizar os KPIs, chama as funções e atualiza o valor do KPI na tela
function atualizarKPIs() {
  const economia = calcularEnergiaTotalGerada() * precoKwh;
  const energiaTotalGerada = calcularEnergiaTotalGerada();
  const potencial = calcularPotencial();

  document.getElementById("economia").textContent = `R$ ${economia.toFixed(2)}`;
  document.getElementById("energiaGerada").textContent = `${parseFloat(energiaTotalGerada)} kWh`;
  document.getElementById("potencial").textContent = `${potencial.toFixed(2)}%`;
}

// Função para atualizar a tabela a prtir do preencher formulário, primeiro se cria mais uma linha a partir dos dados fornecidos, depois adiciona ao array o javascript para ser utilizado
// nas outras funções de atualizar a tablea
function adicionarLinhaTabela(
  mes,
  energiaGerada,
  custoEnergia,
  energiaGasta,
  custoInvestimento
) {
  const tabela = document.querySelector("table tbody");

  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `<td>${mes}</td>
    <td>${energiaGerada}</td>
    <td>${custoEnergia}</td>
    <td>${energiaGasta}</td>
    <td>${custoInvestimento}</td>`;

  tabela.prepend(novaLinha);

  tabelaDados.unshift({
    mes: mes,
    energiaGerada: parseFloat(energiaGerada.replace(",", ".")),
    energiaGasta: parseFloat(energiaGasta.replace(",", ".")),
    custoInvestimento: parseFloat(custoInvestimento.replace(",", ".")),
  });

  gerarGrafico();
}

// EventListener que espera o evento do button submit do modal, pegando todos os dados fornecidos, e chamando a função de adicionar linha que atualiza o gráfico de barras o atualizarGraficoDonut
// e a função que atualiza o kpi, por fim da um reset no form para limpar as informações
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const energiaGeradaInput = document.getElementById("validationDefault01").value;
  const mesInput = document.querySelector("select").value;
  const energiaGastaInput = document.getElementById("validationDefaultUsername").value;
  const custoInvestimentoInput = document.getElementById("validationDefault03").value;

  let custo = precoKwh * parseFloat(energiaGeradaInput);
  // Convertendo os valores para os tipos corretos a serem exibidos
  const energiaGerada = parseFloat(energiaGeradaInput).toFixed(2).replace(".", ",");
  const custoEnergia = `R$ ${custo.toFixed(2).replace(".", ",")}`;
  const energiaGasta = parseFloat(energiaGastaInput).toFixed(2).replace(".", ",");
  const custoInvestimento = `R$ ${parseFloat(custoInvestimentoInput).toFixed(2).replace(".", ",")}`;

  adicionarLinhaTabela(mesInput,energiaGerada,custoEnergia,energiaGasta,custoInvestimento);

  atualizarGraficoDonut();
  atualizarKPIs();
  document.querySelector("form").reset();

});

// chamamos essa função só para garantir que todos os elementos sejam carregados junto da tela
window.onload = function () {
  atualizarKPIs();
  gerarGrafico();
  atualizarGraficoDonut();
};
