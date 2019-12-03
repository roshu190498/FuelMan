const express = require('express')
const bodyParser = require('body-parser')
const routeUser = require('./user')
const routeVendors = require('./vendors')
const routeAdmin = require('./admin')

const app = express()

// for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('thumbnails'))
app.use(bodyParser.json())
app.use('/user',routeUser)
app.use('/admin',routeAdmin)
app.use('/vendors',routeVendors)

app.listen(4000, '0.0.0.0', () => {
    console.log('------------------------------------')
    console.log('server started  on port 4000')
    console.log('Server started Successfully...!!!')
    console.log('-------------------------------------')
})