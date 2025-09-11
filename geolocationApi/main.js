const button = document.getElementById('button')
const text = document.getElementById('text')

function showLoc(position) {
    console.log(position)
    text.innerHTML = `
    <p>Широта - ${position.coords.latitude} </p>
    <p>Долгота - ${position.coords.longitude} </p>
    `
}

button.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            text.innerHTML = `
            <p>Широта - ${position.coords.latitude} </p>
            <p>Долгота - ${position.coords.longitude} </p>
            `
        })
    }
})

