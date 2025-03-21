
/*
Pokrenuti sa run configuration "startuj_proxy" (iliti valjda npm index.js)
Provera proxy: (vraca json)
http://localhost:3000/BTCUSDT/1h

zatim UI/index.html pokrenuti u browseru iz web storma (to pokrece ispod haube integrisani web server)
To je sve.

probni api endpointi
https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#compressedaggregate-trades-list

https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
ovako:
https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h

Interval	interval value
seconds	1s
minutes	1m, 3m, 5m, 15m, 30m
hours	1h, 2h, 4h, 6h, 8h, 12h
days	1d, 3d
weeks	1w
months	1M
 */


const { log, error } = console;
const express = require('express');
const app = express();
const server = app.listen(3000, log('Proxy server is running on port 3000'));
const got = require('got');
const cors = require('cors');

//Tulind Functions
const {
  sma_inc,
  ema_inc,
  markers_inc,
  rsi_inc,
  macd_inc,
} = require('./indicators');

app.use(cors());
app.get('/:symbol/:interval', async (req, res) => {
  try {
    const { symbol, interval } = req.params;
    rere = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=4`;
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
    klinedata = await sma_inc(klinedata);
    klinedata = await ema_inc(klinedata);
    klinedata = markers_inc(klinedata);
    klinedata = await rsi_inc(klinedata);
    klinedata = await macd_inc(klinedata);

    res.status(200).json(klinedata);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * [
 *   [
 *     1499040000000,      // [0] Kline open time
 *     "0.01634790",       // [1] Open price
 *     "0.80000000",       // [2] High price
 *     "0.01575800",       // [3] Low price
 *     "0.01577100",       // [4] Close price
 *     "148976.11427815",  // [5] Volume
 *     1499644799999,      // [6] Kline Close time
 *     "2434.19055334",    // [7] Quote asset volume
 *     308,                // [8] Number of trades
 *     "1756.87402397",    // [9] Taker buy base asset volume
 *     "28.46694368",      // [10] Taker buy quote asset volume
 *     "0"                 // [11] Unused field, ignore.
 *   ]
 * ]
 */
