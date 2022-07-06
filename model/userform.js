const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const { stringify } = require('uuid')
const bcrypt = require('bcrypt');
// const { default: mongoose } = require('mongoose');


const FormSchema = new mongoose.Schema({

    // user : {type : String , required : true , unique : true},
    date_of_register : {type : Date},
    feedback : { type : String }

})




const formmodal = new mongoose.model('formregister',FormSchema)

module.exports = formmodal
 
