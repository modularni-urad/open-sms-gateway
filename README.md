# open-sms-gateway
API server for SMS sending via android phones.
Client application is [open-sms-gateway-android](https://github.com/modularni-urad/open-sms-gateway-android).

## API:
- POST: data predavana pres query params: num, mess (viz. [sendreq.js](test/sendreq.js))

## server pro pripojeni [android appek (AA)](https://github.com/modularni-urad/open-sms-gateway-android)

websocket (WS) komunikace pomoci zprav:
JSON: {typ: 'sendsms', num: tel cislo, message: zprava k odeslani},
reakce zprava od AA (viz. [client.js](test/client.js)) s obsahem "ok" kdyz SMS odeslana, jinak duvod failu v JSON.

## NGINX conf

See [details](https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/)
```
location / {
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_http_version 1.1;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $host;
  proxy_pass http://socket_nodes;
}
```
