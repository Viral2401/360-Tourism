const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/earth360",{


    useNewUrlParser : true,
    useUnifiedTopology : true
    // useCreateIndex : true

}).then(() => {

    console.log("connection sucessfully")

}).catch((e) =>{

    console.log(e)

})