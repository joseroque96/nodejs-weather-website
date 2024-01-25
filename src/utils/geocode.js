const request = require('postman-request')

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9zZXJvcXVlOTYiLCJhIjoiY2t6ejF2c29qMDBhMzNqbzUzMnUzMnF0bCJ9.sxR4AS5BeVdqNdvuPptlxg&limit=1`

    request({url, json: true }, (error, response, {features}) => {
        if(error){
            callback('Unable to connect to geolocation service!!', undefined)
        }else if (!features || features.length === 0){
            callback('Unable to find this location. Try with another location.', undefined)
        }else{
            // const longitud = features[0].center[0],lattitude = features[0].center[1]
            // console.log(`This is the longitud ${longitud} and lattitude ${lattitude} of your location`)
            callback(undefined, {
                longitud: features[0].center[0],
                lattitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })

}

module.exports = geocode