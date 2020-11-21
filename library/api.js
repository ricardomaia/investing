const axios = require("axios");
const { mapping } = require("./mapping");
const { mapResponse } = require("./util");

/**
 *
 * https://sbcharts.investing.com/charts_xml/593d891a6e9af4ac5e334d4958674357_1day.json
 *
 * wss://stream76.forexpros.com/echo/771/bbc289pl/websocket
 */

function callInvesting(pairId) {
  return axios({
    method: "GET",
    url:
      "https://www.investing.com/common/modules/js_instrument_chart/api/data.php",
    params: {
      pair_id: pairId, //
      pair_interval: "60", // in seconds. Minimum value = 60 (1 minute)
      chart_type: "candlestick", // 'area', 'candlestick'
      candle_count: "60", // number of periods
      volume_series: "yes",
      events: "yes", // news
      period: "", //[none], 1-day, 1-week, 1-month, 3-months, 6-months, 1-year, 5-years, max
    },
    headers: {
      Referer: "https://www.investing.com/",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}

async function investing(input) {
  try {
    if (!input) {
      throw Error("Parameter input is required");
    }
    const endpoint = mapping[input];
    if (!endpoint) {
      throw Error(`No mapping found for ${input}, check mapping.js`);
    }
    const response = await callInvesting(endpoint.pairId);
    if (!response.data.candles) {
      throw Error("No response.data.candles found");
    }
    //const results = mapResponse(response.data.candles);
    const results = response.data;
    //console.log(response.data);
    return results;
  } catch (err) {
    console.log(err.message);
  }
}

exports.investing = investing;
