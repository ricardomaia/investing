const { investing } = require("./library/api");
const moment = require("moment");
const cron = require("cron").CronJob;
const fs = require("fs");

let job1 = new cron(
  "1 */1 * * * *", // A cada um minuto e um segundo
  //"*/5 * * * * *", // A cada 5 segundos
  async function () {
    const pairID = "indices/us-30";
    console.log("Updating data every minute");
    let jsonData = await getJSONData(pairID);
    //console.log(jsonData);

    fs.writeFile(`${pairID}.json`, JSON.stringify(jsonData), function (err) {
      if (err) return console.log(err);
    });
  },
  null,
  true,
  "America/Sao_Paulo"
);
job1.start();

/**
 * indices/us-30                -   Dow Jones Industrial Average (NYSE)
 * indices/nq-100               -   Nasdaq 100 (NASDAQ)
 * indices/us-spx-500           -   S&P 500 (NYSE)
 * indices/dj-shanghai          -   Dow Jones Shanghai (DJSH)
 * indices/shanghai-composite   -   Shanghai Composite (SSEC)
 * indices/japan-ni225          -   Nikkei 225 (N225)
 *
 */

// https://br.investing.com/common/modules/js_instrument_chart/api/data.php?pair_id=178&pair_id_for_news=178&chart_type=area&pair_interval=86400&candle_count=120&events=yes&volume_series=yes
/** https://br.investing.com/common/modules/js_instrument_chart/api/data.php?
 * pair_id=178
 * pair_id_for_news=178
 * chart_type=area
 * pair_interval=60
 * candle_count=120
 * events=yes
 * volume_series=yes
 * period=
 */

function getJSONData(pairID) {
  const response = investing(pairID);

  return response;
  const candles = response.candles;
  const attr = response.attr;
  const symbol = attr.symbol;

  /*
  candles.forEach((candle) => {
    epoch = new Date(candle[0]);

    date = moment(epoch).format("DD/MM/YYYY");
    time = moment(epoch).format("HH:mm:ss");
    open = candle[1];
    high = candle[2];
    low = candle[3];
    close = candle[4];
    volume = candle[5];
    adj_close = candle[6];

    //console.log("Date locale: ", epoch.toLocaleString("pt-BR"));
    
    console.log("Symbol: ", symbol);
    console.log("Date: ", date);
    console.log("Time: ", time);
    console.log("Open: ", open);
    console.log("High: ", high);
    console.log("Low: ", low);
    console.log("Close: ", close);
    console.log("Volume: ", volume);
    console.log("Adj Close: ", adj_close);
    
  });
  */
}
