console.log('privet')


fetch



const promise = new Promise((resolve, reject) => {

    setTimeout(() => {
        console.log('2 seconds passed')

    }, 2000)
    reject()
})

console.log(promise)