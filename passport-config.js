const bcrypt = require('bcrypt')

const localstrategy = require('passport-local').Strategy

function initialize(passport,getUserByEmail) {

    const authenticateuser = async (email,password,done) => {

        const user1 = getUserByEmail(email)
        if (user1 == null) {

            return done(null , false , { message : 'no user with that email'})

        }

        try{

            if ( await bcrypt.compare(password,user1.password)) {
                return done(null,user1)
                
            } else {

                return done(null,false,{ message : 'password incorrect'})

            }

        }
        catch(e){

            return done(e)

        }

    }
    
    passport.use(new localstrategy({ usernameField : 'email'},

    authenticateuser
    ))

    passport.serializeUser((user,done) => { })
    passport.deserializeUser((id,done) => { })


}

module.exports = initialize