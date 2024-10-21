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

const chart = new JSC.Chart('chartContainer', {
    type: 'column',
    title: {
        text: 'Exemplo de Gráfico de Colunas'
    },
    xAxis: {
        label: {
            text: 'Categorias'
        }
    },
    yAxis: {
        label: {
            text: 'Valores'
        }
    },
    series: [{
        name: 'Série 1',
        points: [
            { x: 'Categoria A', y: 30 },
            { x: 'Categoria B', y: 70 },
            { x: 'Categoria C', y: 45 },
            { x: 'Categoria D', y: 60 }
        ]
    }, {
        name: 'Série 2',
        points: [
            { x: 'Categoria A', y: 50 },
            { x: 'Categoria B', y: 20 },
            { x: 'Categoria C', y: 75 },
            { x: 'Categoria D', y: 40 }
        ]
    }]
});

