const request = require('request')

const forecast = (lat,lon,callback) => {
    const url = `https://api.darksky.net/forecast/11c7549b95a06a135f4013a3baefaa16/${lat},${lon}?units=si`

    request( { url, json:true }, (error,response) =>{
        if(error){
            callback('Unable to connect to weather',undefined)
        } else if (response.body.code === 400) {
            callback(response.body.error,undefined)
        } else {
            callback(undefined,response.body.daily.data[0].summary)
        }
        
    })
}

module.exports = forecast