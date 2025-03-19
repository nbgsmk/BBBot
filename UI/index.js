const {log, error} = console;

let symbol = "BTCUSDT";
let interval = "1d";

const getData = async () => {
	const resp = await fetch('http://127.0.0.1:3000/' + symbol + '/' + interval);
	const data = await resp.json();
	return data;
};

// getData();

const renderChart = async () => {
	const domElement = document.getElementById('tvchart');

	const chartProperties = {
		timeScale: {
			timeVisible: true,
			secondsVisible: true,
		},
		pane: 0,
	};
	var chart = LightweightCharts.createChart(domElement, chartProperties);
	const candleseries = chart.addCandlestickSeries();
	const klinedata = await getData();
	candleseries.setData(klinedata);
	chart.applyOptions({
		priceScale: {
			mode: PriceScaleMode.Normal,
			scaleMargins: {
				top: 0.10,
				bottom: 0.10,
			},
			entireTextOnly: true,
		},

	});
	const histogramSeries = chart.addHistogramSeries({
		color: '#FFF5EE',
		base: 5,
	});
	histogramSeries.setData([
		{ time: '2025-03-01', value: 20.31, color: '#ff00ff' },
		{ time: '2025-03-02', value: 30.27, color: '#ff00ff' },
		{ time: '2025-03-03', value: 70.28, color: '#ff00ff' },
		{ time: '2025-03-04', value: 49.29, color: '#ff0000' },
		{ time: '2025-03-05', value: 40.64, color: '#ff0000' },
		{ time: '2025-03-06', value: 57.46, color: '#ff0000' },
		{ time: '2025-03-07', value: 50.55, color: '#0000ff' },
		{ time: '2025-03-08', value: 34.85, color: '#0000ff' },
		{ time: '2025-03-09', value: 56.68, color: '#0000ff' },
		{ time: '2025-03-10', value: 51.60, color: '#00ff00' },
		{ time: '2025-03-11', value: 75.33, color: '#00ff00' },
		{ time: '2025-03-12', value: 54.85, color: '#00ff00' },
	]);

	//////
	//SMA
	//////
	const sma_series = chart.addLineSeries({color: 'red', lineWidth: 1});
	const sma_data = klinedata
		.filter((d) => d.sma)
		.map((d) => ({time: d.time, value: d.sma}));
	sma_series.setData(sma_data);

	//////
	//EMA
	//////
	const ema_series = chart.addLineSeries({color: 'green', lineWidth: 1});
	const ema_data = klinedata
		.filter((d) => d.ema)
		.map((d) => ({time: d.time, value: d.ema}));
	ema_series.setData(ema_data);
	//MARKERS
	candleseries.setMarkers(
		klinedata
			.filter((d) => d.long || d.short)
			.map((d) =>
				d.long
					? {
						time: d.time,
						position: 'belowBar',
						color: 'green',
						shape: 'arrowUp',
						text: 'LONG',
					}
					: {
						time: d.time,
						position: 'aboveBar',
						color: 'red',
						shape: 'arrowDown',
						text: 'SHORT',
					}
			)
	);


	/////////
	// VOLUME
	/////////
	// const volume_series = chart.addLineSeries({
	// 	color: 'green',
	// 	lineWidth: 1,
	// 	pane: 2,
	// });
	// const volume_data = klinedata
	// 	.filter((d) => d.volume)
	// 	.map((d) => ({
	// 		time: d.time,
	// 		value: d.volume
	// 	}));
	// volume_series.setData(volume_data);



	/////////
	// SPEED
	/////////
	// const speed_series = chart.addLineSeries({
	// 	color: 'red',
	// 	lineWidth: 1,
	// 	pane: 3,
	// });
	// const speed_data = klinedata
	// 	.filter((d) => d.numtrades)
	// 	.map((d) => ({
	// 		time: d.time,
	// 		value: d.numtrades
	// 	}));
	// speed_series.setData(speed_data);



	//////
	//RSI
	//////
	/*
		const rsi_series = chart.addLineSeries({
			color: 'purple',
			lineWidth: 1,
			pane: 1,
		});
		const rsi_data = klinedata
			.filter((d) => d.rsi)
			.map((d) => ({time: d.time, value: d.rsi}));
		rsi_series.setData(rsi_data);
	*/

	////////////
	//MACD FAST
	////////////
	/*
		const macd_fast_series = chart.addLineSeries({
			color: 'blue',
			lineWidth: 1,
			pane: 2,
		});
		const macd_fast_data = klinedata
			.filter((d) => d.macd_fast)
			.map((d) => ({time: d.time, value: d.macd_fast}));
		macd_fast_series.setData(macd_fast_data);

		////////////
		//MACD SLOW
		////////////
		const macd_slow_series = chart.addLineSeries({
			color: 'red',
			lineWidth: 1,
			pane: 3,
		});
		const macd_slow_data = klinedata
			.filter((d) => d.macd_slow)
			.map((d) => ({time: d.time, value: d.macd_slow}));
		macd_slow_series.setData(macd_slow_data);

		/////////////////
		//MACD HISTOGRAM
		////////////////
		const macd_histogram_series = chart.addHistogramSeries({
			pane: 4,
		});
		const macd_histogram_data = klinedata
			.filter((d) => d.macd_histogram)
			.map((d) => ({
				time: d.time,
				value: d.macd_histogram,
				color: d.macd_histogram > 0 ? 'green' : 'red',
			}));
		macd_histogram_series.setData(macd_histogram_data);
	*/


};

const nacrtajDugmice = async () => {

}

function promeni_ticker(ticker_id) {
	symbol = ticker_id.toUpperCase();
	renderChart();
}

function promeni_interval(interval_id) {
	interval = interval_id.toLowerCase();
	renderChart();
}

renderChart();
nacrtajDugmice();
