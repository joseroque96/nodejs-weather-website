const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(__filename);
// console.log(__dirname, '../public/about.html');
const app = express()

//Define paths for Express config
const getPath = (dir,pathName) => {
    let directory = ''
    if (dir != '' && dir != undefined){
        directory = path.join(__dirname, `../${dir}/`)
    } else{
        directory = path.join(__dirname, '../public/')
        if (pathName != '' && pathName != undefined){ 
            directory = `${publicDir}${pathName}.html`
        }
    }
    return directory
} 
const viewsPath = getPath('templates/views')
const partialsPath = getPath('templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(getPath()))

app.get('' , (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Jose Roque'
    })
})

app.get('/about' , (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Jose Roque'
    })
})

app.get('/help' , (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Jose Roque',
        helpText: 'This is very helpfull'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a adress!'
        })
    }
    let address = req.query.address

    geocode(address, (error, {longitud, lattitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(longitud, lattitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            console.log(location)
            console.log(forecastData)
          
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })

        })
    })

    
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        "products" : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('errors/404',{
        title: '404 Page not found',
        name: 'Jose Roque',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('errors/404',{
        title: '404 Page not found',
        name: 'Jose Roque',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})