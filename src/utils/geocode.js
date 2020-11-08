const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibmlrb2xhb3N6b3VtcCIsImEiOiJja2d2NWJnc3owaXRvMnlwanRwdmFwbTIxIn0.8TJtRzKjRISh-nNYBm4Z8g&limit=1'

    request({ url: url, json:true }, (error, response) => {
        if (error) {
            callback('Unable to connect to lcation servise!',undefined)
        } else if (response.body.features.length === 0 ) {
            callback('unable to find location.Try again another search', undefined)
        } else {
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


//setup an error handler for low-level errors
//geocoding
//address -> Lat/Long -> Weather
// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibmlrb2xhb3N6b3VtcCIsImEiOiJja2d2NWJnc3owaXRvMnlwanRwdmFwbTIxIn0.8TJtRzKjRISh-nNYBm4Z8g&limit=1'
// //latitude = γεωγραφικό πλάτος
// //longtitude = γεωγραφικό μήκος
// request({ url: geocodeUrl, json:true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location!')
//     } else {
//         const latitude =  response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log("The latitude is: " + latitude + " ,and longtitube is:  " + longtitude)

//     }
    
// })
