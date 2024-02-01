const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = '159626839025-ag4q8tiio0s1tn7ft2qtlniq3m8nhp7f.apps.googleusercontent.com'
//const GOOGLE_CLIENT_ID = '159626839025-860e2eq8l5f93pr0664gtkoupbmahct5.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET ='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'
const GOOGLE_CLIENT_SECRET = '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'
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/v1/google/return",
    scope: ["profile", "email"]
  },
  function( accessToken, refreshToken, profile, callback) {
    console.log(profile)
    callback(null, profile)
  }
));

passport.serializeUser((user, done)=>{
    done(null,user)
})

passport.deserializeUser((user, done)=>{
    done(null,user)
})

