const router = require('express').Router();
const citizen = require('./citizen-routes')
const user = require("./user-routes")


router.use('/citizens', citizen);
router.use('/users', user);
module.exports = router;