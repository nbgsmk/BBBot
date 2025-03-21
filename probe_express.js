console.log('hajde');
import { createChart, LineSeries, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import cors from "cors";
import got from 'got';
import express from 'express';


const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chartContainer = document.getElementById('tv_chart');
const chart = createChart(chartContainer, chartOptions);

const dayData = [
	{ time: '2019-10-19', value: 26.19 },
	{ time: '2019-10-22', value: 25.87 },
	{ time: '2019-10-23', value: 25.83 },
	{ time: '2019-10-24', value: 25.78 },
];
const weekData = [
	{ time: '2019-07-18', value: 26.1 },
	{ time: '2019-07-25', value: 26.19 },
	{ time: '2019-08-01', value: 26.24 },
	{ time: '2019-08-08', value: 26.22 },
];
const monthData = [
	{ time: '2018-12-01', value: 25.4 },
	{ time: '2019-01-01', value: 25.5 },
	{ time: '2019-02-01', value: 25.11 },
	{ time: '2019-03-01', value: 25.24 },
];
const seriesData = new Map([
	['1D', dayData],
	['1W', weekData],
	['1M', monthData],
]);
const intervalColors = {
	'1D': '#2962FF',
	'1W': 'rgb(225, 87, 90)',
	'1M': 'rgb(242, 142, 44)',
	'1Y': 'rgb(164, 89, 209)',
};


const lineSeries = chart.addSeries(LineSeries, { color: intervalColors['1D'] });
lineSeries.setData([
	{ time: '2019-04-11', value: 80.01 },
	{ time: '2019-04-12', value: 96.63 },
	{ time: '2019-04-13', value: 76.64 },
	{ time: '2019-04-14', value: 81.89 },
	{ time: '2019-04-15', value: 74.43 },
	{ time: '2019-04-16', value: 80.01 },
	{ time: '2019-04-17', value: 96.63 },
	{ time: '2019-04-18', value: 76.64 },
	{ time: '2019-04-19', value: 81.89 },
	{ time: '2019-04-20', value: 94.43 },
]);


const candlestickSeries = chart.addSeries(CandlestickSeries, {
	upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
	wickUpColor: '#26a69a', wickDownColor: '#ef5350',
});
candlestickSeries.setData([
	{ time: '2019-04-11', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
	{ time: '2019-04-12', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
	{ time: '2019-04-13', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
	{ time: '2019-04-14', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
	{ time: '2019-04-15', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
	{ time: '2019-04-16', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
	{ time: '2019-04-17', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
	{ time: '2019-04-18', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
	{ time: '2019-04-19', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
	{ time: '2019-04-20', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
]);



const hData = [
	{ time: '2019-04-11', value: 8.01 },
	{ time: '2019-04-12', value: 9.63 },
	{ time: '2019-04-13', value: 7.64 },
	{ time: '2019-04-14', value: 8.89 },
	{ time: '2019-04-15', value: 7.43 },
	{ time: '2019-04-16', value: 8.01 },
	{ time: '2019-04-17', value: 9.63 },
	{ time: '2019-04-18', value: 7.64 },
	{ time: '2019-04-19', value: 8.89 },
	{ time: '2019-04-20', value: 9.43 },
];


const volumeSeries = chart.addSeries(
	HistogramSeries,
	{
		priceFormat: {
			type: 'volume',
		},
	},
	1 // Pane index
);
volumeSeries.setData(hData);

const v2 = chart.addSeries(
	HistogramSeries,
	{
		priceFormat: {
			type: 'volume',
		},
	},
	2 // Pane index
);
v2.setData(hData);



const v3 = chart.addSeries(
	LineSeries,
	{
		priceFormat: {
			type: 'volume',
		},
	},
	3 // Pane index
);
v3.setData(hData);

chart.timeScale().fitContent();

export function klik(ajdi) {
	console.log('klik na ' + ajdi );
}

export function prikiti() {
	console.log('prikiti ');
}


export function setChartInterval(interval) {
	lineSeries.setData(seriesData.get(interval));
	lineSeries.applyOptions({
		color: intervalColors[interval],
	});
	chart.timeScale().fitContent();
}



app.use(cors());
app.get('/:symbol/:interval', async (req, res) => {
	try {
		const { symbol, interval } = req.params;
		let rere;
		// rere = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`;
		rere = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1D&limit=10`;
		console.log(rere);
		const resp = await got(
			rere
			// `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
		);
		const data = JSON.parse(resp.body);
		let klinedata = data.map((d) => ({
			time: d[0] / 1000,
			open: d[1] * 1,
			high: d[2] * 1,
			low: d[3] * 1,
			close: d[4] * 1,

			volume: d[5],
			numtrades: d[8],
		}));

		res.status(200).json(klinedata);
	} catch (err) {
		res.status(500).send(err);
	}
});

const getData = async () => {
	const resp = await fetch('http://127.0.0.1:3000/' + symbol + '/' + interval);
	const data = await resp.json();
	return data;
};

// setChartInterval('1D');

// const buttonsContainer = document.createElement('div');
// buttonsContainer.classList.add('buttons-container');
// const intervals = ['1D', '1W', '1M', '1Y'];
// intervals.forEach(interval => {
// 	const button = document.createElement('button');
// 	button.innerText = interval;
// 	button.addEventListener('click', () => setChartInterval(interval));
// 	buttonsContainer.appendChild(button);
// });
//
// chartContainer.appendChild(buttonsContainer);



const app = express();
app.use(cors());
app.get('/patka', async (req, res) => {
	console.log('usao sam');
	try {
		console.log('traj');
		const { symbol, interval } = req.params;
		const rere = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=3`;
		console.log('rikvest: ' + rere);
		const resp = await got(
			rere
			// `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
		);
		const data = JSON.parse(resp.body);
		console.log(data);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.listen(3000, () => {
	console.log('server ranuje');
})
