const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for exptress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shashank Balodi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shashank Balodi',
        helpText: 'This is helping text.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shashank Balodi',
        aboutText: 'This is a about text.'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }

    res.send({
        products: []
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address'
        });
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, forecast) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast,
                    location,
                    address: req.query.address
                });
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found!!!')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shashank Balodi',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
});