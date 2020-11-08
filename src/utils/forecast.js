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
            " degress out.")
        }
    })
}

module.exports = forecast


//api.weatherstack.com/current
//Έτσι, έχουμε δημιουργήσει τη βασική διεύθυνση URL που είναι όλα αυτά εδώ.

//?access_key=08276dbcf2e23d1c82fccb5f1548c6c4
//Από εκεί ρυθμίζουμε το κλειδί πρόσβασης, διασφαλίζοντας ότι ο καιρός ξέρει ποιοι είμαστε.

//&query=37.8267,-122.4233
//Στη συνέχεια, ρυθμίσαμε το ερώτημά μας, επιτρέποντάς μας να πάρουμε τον καιρό για τη συγκεκριμένη τοποθεσία.

//δηλαδη?
//http://api.weatherstack.com/current?access_key=08276dbcf2e23d1c82fccb5f1548c6c4&query=37.8267,-122.4233



// const url = 'http://api.weatherstack.com/current?access_key=08276dbcf2e23d1c82fccb5f1548c6c4&query=37.8267,-122.4233&units=f'

// request({ url: url, json:true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body) {
//         console.log('Unable to find location')
//     } 
//     else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently  " +response.body.current.temperature + 
//         " degress out. It feels like " + response.body.current.feelslike +  " degress out.")

//     }
// })