const router = require('express').Router();
const sequelize = require('../../config/connectionDB')

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};


// sanity test
router.get("/sanity", (req, res, next) => {
    console.log("test")
    res.send("This is driving me insane!");
});

router.post('/auth', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {

        var login = await sequelize.query(`Select * from users where username ="${username}" and password = "${password}"`, { type: sequelize.QueryTypes.SELECT },

            (function () {
                return function (error, results, fields) { // query callback
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        res.status(200).send("logged in")
                        console.log("TRRRUUUUEE");
                    } else {
                        response.send('Username and/or Password not found');

                    }
                };
            })());
    };
})

module.exports = router;