const express = require('express')
const { port } = require('pg/lib/defaults')
const app = express()



app.use(logger)

app.get("/", (req, res) => {
    res.send("Home Page")
    console.log("Home")
}) 

// app.get("/users/:id", auth, (req, res) => {
//     console.log("Admin Login detected. Now attempting " + req.query.admin)
//     res.send("Welcome, Admin")
//     //next()
// });//, auth)



app.get("/users", auth, (req, res) => {
    console.log("Admin Login detected. Now attempting " + req.query.admin)
    res.send("Welcome, Admin")
    //next()
});//, auth)

function logger(req, res, next) {
    console.log("Logging from "+req.originalUrl + " also " + req.query.admin);
    next()
}

function auth(req, res, next) {
    //console.log("Since you are in, you must've been authorized")
    //console.log("Auth")
    //next()
    if(req.query.admin)
        next();
    else {
        console.log("IMPOSTOR DETECTED")
        res.send("We can't let you in")
    }
    
}

app.listen( (error) => {
    if(error)
        console.log(error)
    else
        console.log("And this, right here, is a callback function inside listen" + process.env.PORT)
})