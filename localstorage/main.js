const fio = document.getElementById('fio')
const email = document.getElementById('email')
const city = document.getElementById('city')

let profile = {
    fio: '',
    email: '',
    city: ''
}

function updateLocalStorage() {
    localStorage.setItem('profile', JSON.stringify(profile))
}

fio.addEventListener('change', (event) => {
    profile.fio = event.target.value
    updateLocalStorage()
})
email.addEventListener('change', (event) => {
    profile.email = event.target.value
    updateLocalStorage()
})
city.addEventListener('change', (event) => {
    profile.city = event.target.value
    updateLocalStorage()
})

window.onload = () => {
    if (localStorage.getItem('profile')) {
        profile = JSON.parse(localStorage.getItem('profile'))
    }

    fio.value = profile.fio
    email.value = profile.email
    city.value = profile.city
}