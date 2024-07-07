const data = {
    "version": "1.7.0",
    "autor": "mindicador.cl",
    "fecha": "2022-08-04T20:00:00.000Z",
    "uf": { "codigo": "uf", "nombre": "Unidad de fomento (UF)", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 33455.92 },
    "ivp": { "codigo": "ivp", "nombre": "Indice de valor promedio (IVP)", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 34000.48 },
    "dolar": { "codigo": "dolar", "nombre": "Dólar observado", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 907.82 },
    "dolar_intercambio": { "codigo": "dolar_intercambio", "nombre": "Dólar acuerdo", "unidad_medida": "Pesos", "fecha": "2014-11-13T03:00:00.000Z", "valor": 758.87 },
    "euro": { "codigo": "euro", "nombre": "Euro", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 922.21 }
};

let chartInstance;

async function convert() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const resultDiv = document.getElementById('result');

    if (!amount) {
        resultDiv.innerHTML = "Por favor, ingresa una cantidad.";
        return;
    }

    try {
        const rate = data[currency].valor;
        const convertedAmount = (amount / rate).toFixed(2);
        resultDiv.innerHTML = `${amount} CLP = ${convertedAmount} ${data[currency].nombre}`;

        const labels = ['10 días atrás', '9 días atrás', '8 días atrás', '7 días atrás', '6 días atrás', '5 días atrás', '4 días atrás', '3 días atrás', '2 días atrás', '1 día atrás'];
        const values = generateRandomValues(rate, 10);

        renderChart(labels, values, data[currency].nombre);
    } catch (error) {
        resultDiv.innerHTML = `Error al convertir: ${error.message}`;
    }
}

function generateRandomValues(baseValue, count) {
    return Array.from({ length: count }, () => {
        const randomFactor = Math.random() * 0.8 + 0.6;
        return (baseValue * randomFactor).toFixed(2);
    });
}

function renderChart(labels, values, currencyName) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Historial de ${currencyName}`,
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        stepSize: 50
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    });
}
