//Copyright Daniel Gray 2017. Please refer to LICENCE.MD for more info.
const config = require("./config.json");
const express = require("express");
const coinbase = require("coinbase")
const app = express();
const client = new coinbase.Client({ 'apiKey': config.coinbaseapikey, 'apiSecret': config.coinbaseapisecret })

//Store all the exchange values so we can render them.
var CurrentbtcBalueUSD
var CurrentbtcBalueGBP
var CurrentbtcBalueCNY

client.getBuyPrice({ 'currencyPair': 'BTC-USD' }, function(err, obj) {
    CurrentbtcValueUSD = `$${obj.data.amount}`

});
client.getBuyPrice({ 'currencyPair': 'BTC-GBP' }, function(err, obj) {
    CurrentbtcValueGBP = `£${obj.data.amount}`

});
client.getBuyPrice({ 'currencyPair': 'BTC-CNY' }, function(err, obj) {
    CurrentbtcValueCNY = `${obj.data.amount}`

});

app.set('view engine', 'ejs');
app.get('/', function(req, res) {

    res.render('index', {
        usdprice: CurrentbtcValueUSD,
        gbpprice: CurrentbtcValueGBP,
        cnyprice: CurrentbtcValueCNY,
        updatedtime: new Date()
    })
})


app.listen(config.port, () => console.log(`Bitcoin Prices listening on port ${config.port}!`))