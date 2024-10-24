document.querySelector('.dashboard').addEventListener('click', function() {
    document.querySelector('.abaDashboard').classList.add('active');
    document.querySelector('.abaPerfil').classList.remove('active');
    document.querySelector('.abaFormulario').classList.remove('active');
});

document.querySelector('.perfil').addEventListener('click', function() {
    document.querySelector('.abaPerfil').classList.add('active');
    document.querySelector('.abaDashboard').classList.remove('active');
    document.querySelector('.abaFormulario').classList.remove('active');
});

document.querySelector('.formulario').addEventListener('click', function() {
    document.querySelector('.abaFormulario').classList.add('active');
    document.querySelector('.abaDashboard').classList.remove('active');
    document.querySelector('.abaPerfil').classList.remove('active');
});

// Mostrar a aba de Dashboard por padrão
document.querySelector('.abaDashboard').classList.add('active');

const averageValue = 52; // Valor da média

        const chart = new JSC.Chart('chartContainer', {
            type: 'column',
            title: {
                text: 'Exemplo de Gráfico de Colunas'
            },
            xAxis: {
                label: {
                    text: 'Meses'
                }
            },
            yAxis: {
                label: {
                    text: 'Energia em kWh/mês'
                }
            },
            series: [{
                name: 'Energia esperada',
                points: [
                    { x: 'Janeiro', y: 56 },
                    { x: 'Fevereiro', y: 44 },
                    { x: 'Março', y: 49 },
                    { x: 'Abril', y: 51 },
                    { x: 'Maio', y: 52 },
                    { x: 'Junho', y: 52 },
                    { x: 'Julho', y: 44 },
                    { x: 'Agosto', y: 46 },
                    { x: 'Setembro', y: 43 },
                    { x: 'Outubro', y: 51 },
                    { x: 'Novembro', y: 52 },
                    { x: 'Dezembro', y: 50 }
                ]
            }, {
                name: 'Média',
                points: [
                    { x: 'Janeiro', y: averageValue },
                    { x: 'Fevereiro', y: averageValue },
                    { x: 'Março', y: averageValue },
                    { x: 'Abril', y: averageValue },
                    { x: 'Maio', y: averageValue },
                    { x: 'Junho', y: averageValue },
                    { x: 'Julho', y: averageValue },
                    { x: 'Agosto', y: averageValue },
                    { x: 'Setembro', y: averageValue },
                    { x: 'Outubro', y: averageValue },
                    { x: 'Novembro', y: averageValue },
                    { x: 'Dezembro', y: averageValue }
                ],
                type: 'line',
                color: '#FF0000', // Cor da linha média
                lineWidth: 2,
                markers: {
                    visible: false // Ocultar marcadores na linha
                }
            }]
        });

