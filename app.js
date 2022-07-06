if (process.env.NODE_ENV !== 'production') {

    require('dotenv').config()

}

const express = require('express');
const res = require('express/lib/response');
const app = express();
require('./model/conn');
const register = require('./model/user')
const registerform = require('./model/userform')
const path = require('path');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const initializepassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const { redirect } = require('express/lib/response');
const methodOverride = require('method-override');
const { request } = require('http');

// mongoose.connect('mongodb://<credentials>@realm.mongodb.com:27020/?<parameters>')


initializepassport(passport, email => {

    return user.find(user => user.email === email)

})

const user = []

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'));

app.use(passport.initialize())
app.use(passport, session())

app.use(flash())
app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))


app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost:27017/login-app-db',{


//    useNewUrlParser : true,
//    useUnifiedTopology : true
// //    useCreateIndex : truecmd


// })

// app.use('/',require('./model/router'))
app.use(express.static(__dirname + '/public'));

// app.get('/', function (req, res) {
//     res.render(path.join(__dirname, '/public/index.ejs'));
// });

app.get('/', function (req, res) {
    res.render("index");
});


app.get('/signin', function (req, res) {
    res.render("signin");
});

app.post('/signin', async function (req, res) {

    try {

        let password1 = req.body.password;
        let confirmpassword1 = req.body.confirmpassword;

        let passwordhash = await bcrypt.hash(req.body.password, 10)
        let Confirm_Password = await bcrypt.hash(req.body.confirmpassword, 10)


        if (password1 == confirmpassword1) {


            // user.push({

            //     id: Date.now().toString(),
            //     time: new Date(),
            //     user: req.body.user,
            //     email: req.body.email,
            //     password: passwordhash,
            //     cofirmpassword: Cofirm_Password

            //     // id: Date.now().toString(),
            //     // time: new Date(),
            //     // User: req.body.user,
            //     // email: req.body.email,
            //     // Password: passwordhash,
            //     // CofirmPassword: Cofirm_Password


            // })

            const registerEmployee = new register({

                id: Date.now().toString(),
                date_of_register: new Date(),
                // user: req.body.user,
                email: req.body.email,
                password: password1,
                confirmpassword: confirmpassword1

                // id: Date.now().toString(),
                // time: new Date(),
                // User: req.body.user,
                // email: req.body.email,
                // Password: passwordhash,
                // CofirmPassword: Cofirm_Password


            })

            // password hashing


            const registered = await registerEmployee.save()
            res.status(201).render("signin")


        } else {

            res.send("password are not match")

        }



        res.redirect('/login')



    } catch (e) {

        // res.redirect('/signin')
        console.log(e)


    }

    console.log(user)

});


app.get('/login', function (req, res) {
    res.render("login");
});

app.get('/tour', function (req, res) {
    res.render("tour")
});


// app.post('/login',passport.authenticate('local',{

//     successRedirect : '/login',
//     failureRedirect : '/index',
//     failureFlash : true


// }))

app.post('/login', async function (req, res) {

    // successRediret: '/',
    // failureRedirect: '/login',
    // failureFlash: true

    try {


        let emaillogin = req.body.email;
        let passwordlogin = req.body.password;
        // console.log(passwordlogin)

        let useremail = await register.findOne({ email: emaillogin })
        // console.log(useremail.password)

        const isMatch = await bcrypt.compare(passwordlogin, useremail.password)

        if (isMatch) {

            res.status(201).render("login")

        }
        else {

            res.status(400).send("invalid email or password")


        }

    } catch (error) {

        // res.status(400).send("invalid email or password")
        console.log(error)

    }


});




app.delete('/logout', function (req, res) {

    req.logOut
    res.render("index")


})

app.get('/', function (req, res) {
    // res.render(path.join(__dirname, '/public/formdata.ejs'));
    res.render("index")
});

const data = []
app.post('/', async (req, res) => {

    try {



        const registerform1 = new registerform({

            id: Date.now().toString(),
            date_of_register: new Date(),
            feedback : req.body.whatweshouldimproveinourwebsites

        })

        const registered = await registerform1.save()
        res.status(201).render("index")


    } catch (error) {

        res.status(201).render("index")


    }

    // console.log(data)


});


app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(3000, () => {
    console.log('visit http://localhost:3000/');
});