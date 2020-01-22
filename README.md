# open-sms-gateway
API server for SMS sending via android phones.
Client application is [open-sms-gateway-android](https://github.com/modularni-urad/open-sms-gateway-android).

## API:
- POST: data predavana pres query params: num, mess (viz. [sendreq.js](test/sendreq.js))

## server pro pripojeni android appek (AA)

websocket (WS) komunikace pomoci zprav:
-send: JSON: {num: tel cislo, message: zprava k odeslani},
reakce zprava od AA send_result (viz. [client.js](test/client.js)) s obsahem "ok" kdyz SMS odeslana, jinak duvod failu.