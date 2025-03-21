import { createChart, LineSeries, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import cors from 'cors';
// import cors from 'cors';
// console.log(cors);
// const got = require('got');
// const cors = require('cors');



const chartOptions = { layout: { textColor: 'blue', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('tv_chart'), chartOptions);

const lineSeries = chart.addSeries(LineSeries);
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


chart.timeScale().fitContent();
