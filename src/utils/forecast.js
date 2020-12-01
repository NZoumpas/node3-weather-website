const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=08276dbcf2e23d1c82fccb5f1548c6c4&query=37.8267,-122.4233&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=08276dbcf2e23d1c82fccb5f1548c6c4&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json:true }, (error,response) => {
        if (error) {
            callback('Unable to connect to location service weather.',undefined)
        }else if (response.body.error) {
            callback('Unable to find location.Try another search!', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently  " + response.body.current.temperature +
            " degress out.With wind speed "+ response.body.current.wind_speed + " and Wind degree " + response.body.current.wind_degree + " ." ) 
        }
    })
}
module.exports = forecast
