const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const { stringify } = require('uuid')
const bcrypt = require('bcrypt');
// const { default: mongoose } = require('mongoose');


const UserSchema = new mongoose.Schema({

    // user : {type : String , required : true , unique : true},
    date_of_register : {type : Date},
    email : { type : String , required : true},
    password : { type: String , required : true},
    confirmpassword : { type: String , required : true},
    feedback : { type : String , required : false}

})


UserSchema.pre("save", async function(next){

    if(this.isModified("password")){

    // let passwordhash = await bcrypt.hash(password, 10)
    // let Confirm_Password = await bcrypt.hash(confirmpassword, 10)

    // console.log(this.password)
    this.password = await bcrypt.hash(this.password,10);
    // console.log(this.password)
    // this.confirmpassword = await bcrypt.hash(this.confirmpassword,10);

    this.confirmpassword = undefined

 

    }

    next();

})

const model = new mongoose.model('register',UserSchema)

module.exports = model
 
