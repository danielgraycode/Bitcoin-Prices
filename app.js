//Copyright Daniel Gray 2017. Please refer to LICENCE.MD for more info.
const config = require("./config.json");
const express = require("express");
const coinbase = require("coinbase");
const http = require("http");
const https = require("https");
const fs = require("fs")
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


//Setup the web server
if (config.httpenabled === "1") {
    var httpServer = http.createServer(app)
    httpServer.listen(config.port)
    console.log(`Bitcoin-Prices (HTTP) running on ${config.httpport}`)
}


if (config.sslenabled === "1") {
    var privateKey = fs.readFileSync(config.sslPrivateKey, 'utf8');
    var certificate = fs.readFileSync(config.sslCertificate, 'utf8');
    var credentials = { key: privateKey, cert: certificate }
    var httpsServer = https.createServer(credentials, app)
    httpsServer.listen(config.httpsport)
    console.log(`Bitcoin-Prices (HTTPS) running on ${config.httpsport}`)
}