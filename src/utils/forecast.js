const request = require('postman-request')

// //weather
// const url = 'http://api.weatherstack.com/current?access_key=f512f8a924cb7f0ce31092afeba3ceea&query=187.213.170.93&units=f'
// // const url = 'http://weatherstack.com/ws_api.php?ip=187.213.170.93'
// request({url: url, json: true}, (error, response, body) => {
//     if(error){
//         console.log('Unable to connect to weather service!!')
//     }else if(body.error && body.error.code == 601){
//         console.log('Unable to find location!!')
//     }else{
//         let unitDegree = 'Cº'
//         if(body.request.unit === 'f') unitDegree = 'Fº'
//         console.log(`Here on ${body.location.name} it's currently ${body.current.weather_descriptions[0]} and is ${body.current.temperature}${unitDegree} out. It fells like  ${body.current.feelslike}${unitDegree} out and is a ${body.current.precip}% chance of rain.`)
//     }
// })

const forecast = (longitud, lattitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f512f8a924cb7f0ce31092afeba3ceea&query=${lattitude},${longitud}&units=f`
    request({url, json: true}, (e, response, {error, request: {unit}, location: {name: location}, current: { weather_descriptions, temperature, feelslike, precip }   }) => {
        if(e){
            callback('Unable to connect to weather service!!')
        }else if(error){
            if (error.code == 601) callback('Unable to find location!!')
            
            callback(error.info)
        }else{
            let unitDegree = 'Cº'
            if(unit === 'f') unitDegree = 'Fº'
            callback(undefined,`Here on ${location} it's currently ${weather_descriptions[0]} and is ${temperature}${unitDegree} out. It fells like  ${feelslike}${unitDegree} out and is a ${precip}% chance of rain.`)
        }
    })
}

module.exports = forecast