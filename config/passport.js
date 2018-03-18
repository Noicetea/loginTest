const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userInfo = require('./user-info');

// console.log(userInfo.getUser('admin'), userInfo.getUser('asdasd'));

// configure passport.js to use the local strategy
passport.use('login', new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      console.log('Inside local strategy callback')
      // here is where you make a call to the database
      // to find the user based on their username or email address
      // for now, we'll just pretend we found that it was users[0]
    //   const user = users[0]
        console.log(username, password, done)
      let user = userInfo.getUser(username);
      console.log(user)
      if(typeof user==='undefined'){
        console.log('auth_1')
        return done(null, false, {message:'User not found'});
      }
      else if(username == user.username && password == user.password) {
        console.log('auth_2')
        console.log('Local strategy returned true');
        return done(null, user);
      }else{
        console.log('auth_3')
          return done(null, false, {message:'Invalid password'});
      }
    }
  ));
  
// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log(user)
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    // const user = users[0].id === id ? users[0] : false; 
    // done(null, user);
    console.log('deserializeUser', id)
    let user = userInfo.getUserById(id);
    if(typeof user==='undefined')
        done(null, false, 'User not found');
    else
        done(null, user);
});

module.exports = passport;