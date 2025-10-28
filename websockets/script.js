const Status = document.getElementById('status')
const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')


const ws = new WebSocket('ws://localhost:3000')


function printMessage(message) {
    const li = document.createElement('li')
    li.textContent = message
    messages.appendChild(li)
}

form.addEventListener('submit', (e) => {

    e.preventDefault()
    ws.send(input.value)
    input.value = ''

})


ws.addEventListener('open', () => {
    Status.textContent = 'ONLINE'
})

ws.addEventListener('close', () => {
    Status.textContent = 'DISCONNECTED'
})

ws.addEventListener('message', (e) => {
    printMessage(e.data)
})