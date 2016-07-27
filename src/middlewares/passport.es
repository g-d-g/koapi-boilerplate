import passport from 'koa-passport'
import OAuth2Strategy from 'passport-oauth2'
import GitHubStrategy from 'passport-github'
import BearerStrategy from 'passport-http-bearer'


// passport.use(new OAuth2Strategy({
//     authorizationURL: 'https://github.com/login/oauth/authorize',
//     tokenURL: 'https://github.com/login/oauth/access_token',
//     clientID: 'f2ee0541fecc7c773d5d',
//     clientSecret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
//     callbackURL: "http://ubuntu:5000/oauth/github/callback",
//     scopeSeparator: ',',
//     userProfileURL:
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

passport.use(
  new GitHubStrategy({
  clientID: 'f2ee0541fecc7c773d5d',
  clientSecret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
  callbackURL: "http://ubuntu:5000/oauth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    return cb(null, profile);
    }
  )
);
passport.use(new BearerStrategy(
  function(token, done) {
    return done(null, {name:'test'}, {scope: 'all'});
  }
));

export default passport;
export const authenticate = (name, options, callback) => {
  options = Object.assign({session:false}, options);
  return passport.authenticate(name, options, callback);
}
