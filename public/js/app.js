console.log("client side java script is loaded!")

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const fetchData = (location, callback) => {
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                callback(data.error)
            } else {
                callback(undefined, {
                    location: data.location,
                    forecast: data.forecast
                })
            } 
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""

    const location = search.value
    fetchData(location, (error, {location, forecast} = {}) => {
        if (error){
            messageOne.textContent = error
        } else {
            messageOne.textContent = location
            messageTwo.textContent = forecast
        }
    })

})