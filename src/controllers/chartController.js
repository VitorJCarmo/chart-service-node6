const { CanvasRenderService } = require('chartjs-node-canvas');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const chartjs = require('chart.js');
var ChartJS;

const width = 400;
const height = 400;
const configuration = {
    type: 'bar',
    data: {
        labels: undefined,
        datasets: [{
            label: 'Faturamento visão anual',
            data: undefined,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: (value) => 'R$' + value,
                }
            }]
        }
    }
};

var chartCallback =  async (function (ChartJS) {
    try {
    configuration.data.datasets[0].data =  await (ChartJS.data)
    configuration.data.labels =   await (ChartJS.labels);
    const canvasRenderService = new CanvasRenderService(400, 400);   
    return await (canvasRenderService.renderToBuffer(configuration));
    } catch (error) {
		console.log(error);
	}
});

exports.drawChart = async (function callback(req , res , next) {
    try {
    var image = await (chartCallback(req.body));
    res.type("image/png");
    res.send(image);
    } catch (error) {
        console.log(error);
    }
});