const router = require('express').Router();
const sequelize = require('../../config/connectionDB')

// sanity test
router.get("/sanity", (req, res, next) => {
    console.log("test")
    res.send("This is driving");
});

// SEARCH by Citizen ID
router.get("/search/:citizenid", async (req, res, next) => {
    const citizenid = req.params.citizenid
    console.log("citizenid=" + citizenid)
    // var returnData = callDatabase(citizenid)
    console.time("fullRun")
    callDatabase(citizenid).then(value => {
        console.log("returnData=" + value)
        resStatus = value.status
        resData = value.data
        res.status(resStatus).send(resData)
        console.timeEnd("fullRun")
    })

})

// search by name 
router.get('/namesearch', async (req, res) => {
    try {
        const citizen = await sequelize.query(`SELECT * FROM citizen WHERE surname LIKE '${req.query.surname}%' AND forename LIKE '${req.query.forename}%'`, { type: sequelize.QueryTypes.SELECT });
        res.status(200).send(citizen);
    } catch (error) {
        res.status(500).send({
            message:
                "An error occurred while retreiving data"
        });
    }
});

//vehicle registration

router.get('/regsearch/:reg', async (req, res) => {
    try {
        const vehicle = await sequelize.query(`SELECT c.citizenID, v.forename, v.lastname, v.address, v.dateOfBirth, v.driverLicenceId, v.vehRegNo, v.make, v.model, v.colour 
        FROM vehicleRegistration v
        JOIN citizen c ON
        c.forename=v.forename AND c.surname=v.lastname AND c.homeAddress=v.address AND c.dateOfBirth=v.dateOfBirth
        WHERE vehRegNo=?;`, { replacements: [req.params.reg], type: sequelize.QueryTypes.SELECT });
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send({
            message:
                "An error occurred while retreiving data"
        });
    }
});

// Local functions

async function callDatabase(citizenid) {
    try {
        console.time("citizenAndPassport")
        const citizenAndPassport = await sequelize.query(
            `SELECT c.citizenID, c.forename, c.surname, c.homeAddress, c.dateOfBirth, c.placeOfBirth, c.sex, p.passportNumber, p.nationality, p.issuingCountry, p.dateOfIssue, p.dateOfExpiry FROM citizen c JOIN passport p ON c.forename=p.forename AND c.surname=p.surname AND c.dateOfBirth=p.dateOfBirth WHERE c.citizenID=${citizenid} `, { type: sequelize.QueryTypes.SELECT })
        console.timeEnd("citizenAndPassport")
        console.time("incomingCalls")
        const incomingCalls = await sequelize.query(
            `SELECT mcr.timestamp, pm.forename, pm.surname, mcr.callerMSISDN, mcr.receiverMSISDN FROM BAE.mobileCallRecords mcr
            JOIN BAE.peoplemobile pm ON mcr.callerMSISDN=pm.mobileNumber
            WHERE mcr.receiverMSISDN=(SELECT mobileNumber FROM BAE.peoplemobile pm 
            JOIN BAE.citizen c ON c.forename=pm.forename AND c.surname=pm.surname AND c.dateOfBirth=pm.dateOfBirth AND c.homeAddress=pm.address
            WHERE citizenID=${citizenid} )
            GROUP BY timestamp ORDER BY timestamp desc;`, { type: sequelize.QueryTypes.SELECT })
        console.timeEnd("incomingCalls")
        console.time("outgoingCalls")
        const outgoingCalls = await sequelize.query(
            `SELECT mcr.timestamp, pm.forename, pm.surname, mcr.callerMSISDN, mcr.receiverMSISDN FROM mobileCallRecords mcr
                JOIN peoplemobile pm ON mcr.callerMSISDN=pm.mobileNumber
                WHERE mcr.receiverMSISDN=(SELECT mobileNumber FROM peoplemobile pm 
                JOIN citizen c ON c.forename=pm.forename AND c.surname=pm.surname AND c.dateOfBirth=pm.dateOfBirth AND c.homeAddress=pm.address
                WHERE citizenID=${citizenid} )
                GROUP BY timestamp ORDER BY timestamp desc;`, { type: sequelize.QueryTypes.SELECT })
        console.timeEnd("outgoingCalls")
        console.time("atmTransaction")
        const atmTransaction = await sequelize.query(`SELECT ba.forename, ba.surname, ba.accountNumber, ba.bank, bc.sortCode, atmt.bankCardNumber, atmt.timestamp, atmt.typeAtm, atmt.amount, atmp.streetName, atmp.postcode, atmp.latitude, atmp.longitude
            FROM peoplebankaccount ba
            JOIN citizen c
            ON c.forename=ba.forename AND c.surname=ba.surname AND c.homeAddress=ba.homeAddress AND c.dateOfBirth=ba.dateOfBirth
            JOIN bankcard bc
            ON ba.bankAccountId=bc.bankAccountId
            JOIN atmTransaction atmt
            ON bc.cardnumber=atmt.bankCardNumber
            JOIN atmpoint atmp
            ON atmt.atmId=atmp.atmId
            WHERE c.citizenID=${citizenid}`, { type: sequelize.QueryTypes.SELECT })
        console.timeEnd("atmTransaction")
        console.time("eposTransactions")

        const eposTransactions = await sequelize.query(`SELECT ba.forename, ba.surname, ba.accountNumber, ba.bank, bc.sortCode, epot.bankCardNumber, epot.timestamp, epot.payeeAccount, epot.amount, epos.vendor, epos.streetName, epos.postcode, epos.latitude, epos.longitude
            FROM peoplebankaccount ba
            JOIN citizen c
            ON c.forename=ba.forename AND c.surname=ba.surname AND c.homeAddress=ba.homeAddress AND c.dateOfBirth=ba.dateOfBirth
            JOIN bankcard bc
            ON ba.bankAccountId=bc.bankAccountId
            JOIN eposTransactions epot
            ON bc.cardnumber=epot.bankCardNumber
            JOIN epos epos
            ON epot.eposId=epos.id
            WHERE c.citizenID=${citizenid}`, { type: sequelize.QueryTypes.SELECT });
        console.timeEnd("eposTransactions")

        console.time("ANPRPsighting")

        const ANPRPsighting = await sequelize.query(`Select vo.vehicleRegistrationNumber, v.make, v.model, v.colour, vo.timestamp, a.latitude, a.longitude FROM vehicleObservations vo
        JOIN anprcamera a ON vo.ANPRPointId = a.anprId
        JOIN vehicleRegistration v ON vo.vehicleRegistrationNumber= v.vehRegNo
        JOIN citizen c ON c.forename = v.forename AND c.surname = v.lastname AND c.homeAddress = v.address AND c.dateOfBirth = v.dateOfBirth
        WHERE c.citizenID=${citizenid}`, { type: sequelize.QueryTypes.SELECT })
        console.timeEnd("ANPRPsighting")

        return { status: 200, data: { citizenAndPassport, incomingCalls, outgoingCalls, eposTransactions, atmTransaction, ANPRPsighting } }

    } catch (error) {
        return { status: 500, data: error.message || "An error has occured while reciving the data" }
    }
}

module.exports = router;