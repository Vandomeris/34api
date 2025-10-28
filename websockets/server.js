const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 3000
});

wss.on('connection', (connect) => {


    connect.on('message', (message) => {
        console.log(message.toString())

        console.log(wss.clients)

        wss.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString())
            }

        })


    })

})