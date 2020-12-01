const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))//οσες φορεσ γραψω ../ με παει μια διαδρομμη πισω

const app = express()
const port = process.env.PORT || 3000

//define paths for express config - ορίστε διαδρομές για express διαμόρφωση
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location - ρύθμιση κινητήρα τιμονιού και τοποθεσία προβολών
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve - εγκατάσταση στατικού καταλόγου για προβολή
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather!',
        name: 'Nikos Zoumpas',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page!',
        name: 'Nikos Zoumpas'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'It is a long established fact that a reader will be distracted',
        title: 'Help',
        name: 'Nikos Zoumpas'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search )
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikos Zoump',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikos Zoump',
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
