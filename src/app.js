const Express       = require('express');
const App           = Express();
const Favicon       = require("serve-favicon");
const BodyParser    = require('body-parser')
const CookieParser  = require('cookie-parser');
const Session       = require('express-session')

/* 
    DOCU: Session Provider 
    Set the session settings to be used
*/
let session_setting = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

/* 
    DOCU: Setup the express app settings 
    Specify the static path, view engine used and etc
*/
App.use(Session(session_setting));
App.use(CookieParser('keyboard cat'));
App.set("view engine", "ejs");
App.set("views", __dirname + "/views");
App.use("/public", Express.static(__dirname + "/public"));
App.use(BodyParser.json({limit: '50mb'}));
App.use(BodyParser.urlencoded({limit: '50mb', extended: true}));

/* Routes */
const UserRoutes       = require("./routes/user.routes");

/* User ROUTES */
App.use("/", UserRoutes);

App.listen(3000, function(){
    console.log('Your node js server is running on PORT ' + 3000);
});

module.exports = App; // for testing