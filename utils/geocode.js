const request = require('request')

const geocodingKey = process.env.GEOCODE_KEY

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${geocodingKey}&limit=1`

    request({url, json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if(response.body.features.length === 0) {
            callback('Invalid request',undefined)
        } else {
            const {
                place = response.body.features[0].place_name, 
                latitude = response.body.features[0].center[1],
                longitude = response.body.features[0].center[0]
            } = response

            callback(undefined,{
                latitude,
                longitude,
                place
            })
        }
    })
}

module.exports = geocode