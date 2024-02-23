const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs') //to create and define partials of webpage
//load utils of weather app
const locationkey = require('./utils/geocode')
const forecast = require('./utils/forecast')

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//to set up template for dynamic web serving

//setup handlebars engine , views location and partials location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
//setup static directory to serve --> all images,css files that are in public directory
// IT SHOULD BE HERE BEFORE GET OF HBS FILES CAUSE THOSE FILES USE CSS AND IMAGES FROM PUBLICDIR
app.use(express.static(publicDirectoryPath))
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//renedering dynamic web page  -->index.hbs
app.get('', (req, res) => {
    // res.render('index') // no need of hbs or html extension

    //providing the value which is accessible from the template (as 2nd argument as an object)
    res.render('index', {
        title: 'Weather app',
        name: 'Medini Udupa'
    })
})

//rendering about page and help pages as dynamic pages
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Medini'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Medini'
    })
})
//weather string search--> creating search query endpoint
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must give an address"
        })
    }

    locationkey(req.query.address,(error,respdata)=>{
        if(error){
            return res.send({error})
        }
        forecast(respdata.key,(error,weatherdata)=>{
            if(error){
                return res.send({ error })
            }
            const l=respdata.city+", "+respdata.country+", "+respdata.state+", "+req.query.address
            res.send({
                forecast:weatherdata,
                // location: respdata.city,
                // country: respdata.country,
                // state: respdata.state,
                // address:req.query.address
                location:l
            })
        })
    })

    // eg to run 
    // http://localhost:3000/weather?address=Mysore


    //dummy forecast
    // res.send({ 
    //     forecast: 'sunny', 
    //     location: "Mysore" ,
    //     address:req.query.address
    // })
})


//404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Medini',
        Errormsg: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Medini',
        Errormsg: "Page not found"
    })
})
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
//rendering static page  --->index.html
//setup static directory to serve
// app.use(express.static(publicDirectoryPath))
//it automatically converts http://localhost:3000/ to http://localhost:3000/index.html
// I HAVE DELETED THOSE FILES COZ THEY ARE ALEADY as HBS FILES IN TEMPLATE DIR
// for rest you need to explicitly give http://localhost:3000/help.html
// for rest you need to explicitly give http://localhost:3000/about.html
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

//setting routes..........
//REFER!!!!       ../playground/9-query-strings.js
//its like intro part i.e static requests
// res.send()  not res.render()

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//listen on port
app.listen(3000, () => {
    console.log("server is up on port 3000")
})


//output at http://localhost:3000/