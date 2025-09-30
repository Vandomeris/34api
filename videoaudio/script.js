const video = document.getElementById('video')
const play = document.getElementById('play')
const pause = document.getElementById('pause')
const stop = document.getElementById('stop')
const volume = document.getElementById('volume')
const seek = document.getElementById('seek')
const fullScreen = document.getElementById('fullScreen')


play.addEventListener('click', () => {
    video.play()
})

pause.addEventListener('click', () => {
    video.pause()
})

stop.addEventListener('click', () => {
    video.pause()
    video.currentTime = 0
})

volume.addEventListener('input', (event) => {
    video.volume = Number(event.target.value) / 100
})

fullScreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen()
    } else {
        document.exitFullscreen?.()
    }
})


seek.addEventListener('input', (e) => {
    video.currentTime = video.duration * (e.target.value / 100)
})