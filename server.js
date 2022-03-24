const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config');
const auth = require("./middleware/auth"); // jwt token validate
const app = express()
let port = process.env.PORT || 3000;
let host = process.env.HOST;


console.log(port)
app.get('/', auth, (req, res) => {
    res.json({ message: 'Already  acess API !' })
})

app.listen(port, () => {
    console.log('Application is running on port' + port)
})


app.get('/token', (req, res) => {

    let user = {
        username: "",
        token: ""
    }
    const { username, password } = req.query;

    console.log(req.query.username)

    // you can check user name and password from db config
    if (username != "ton" || password != "1234") {
        console.log("Access denied!")
        res.status(401).json("Access denied!");
    } else {
        try {
            const token = jwt.sign({ username: req.query.username, password: req.query.password },
                config.get('TOKEN_KEY'), {
                    expiresIn: "60s",
                }
            );
            user.username = req.query.username;
            user.token = token;
            res.status(200).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json(" Interynal server error 500");
        }
    }
})