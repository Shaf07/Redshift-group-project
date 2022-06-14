var data = JSON.parse(localStorage.getItem('Data'));


const ADDR = "http://localhost:5015";

const getRequest = async (citizenId) => {
    try {

        testData = await axios.get(`${ADDR}/api/citizens/search/${citizenId}`);
        localStorage.setItem('Data', JSON.stringify(testData));
        window.location.href = "./profile.html";

        //populateData();
    } catch (err) {
        console.log(err)
    }
}

function populateData(data) {
    console.log("Currently: ", window.href)
    document.getElementById("firstName").innerText += " " + data.data.citizenAndPassport[0].forename;
    document.getElementById("lastName").innerText += " " + data.data.citizenAndPassport[0].surname;
    document.getElementById("id").innerText += " " + data.data.citizenAndPassport[0].citizenID;
    document.getElementById("address").innerText += " " + data.data.citizenAndPassport[0].homeAddress;
    document.getElementById("dob").innerText += " " + data.data.citizenAndPassport[0].dateOfBirth;
    document.getElementById("pob").innerText += " " + data.data.citizenAndPassport[0].placeOfBirth;
    document.getElementById("nationality").innerText += " " + data.data.citizenAndPassport[0].nationality;
    document.getElementById("sex").innerText += " " + data.data.citizenAndPassport[0].sex;
    document.getElementById("passportNumber").innerText += " " + data.data.citizenAndPassport[0].passportNumber;

    document.getElementById("issuingCountry").innerText += " " + data.data.citizenAndPassport[0].issuingCountry;
    document.getElementById("doi").innerText += " " + data.data.citizenAndPassport[0].dateOfIssue;
    document.getElementById("doe").innerText += " " + data.data.citizenAndPassport[0].dateOfExpiry;

    const EPOS_DATA = data.data.eposTransactions
    EPOS_DATA.forEach(populateDataEpos);


}



function populateDataEpos(EPOS_DATA, index) {

    const EPOS_ROW = document.createElement("tr");

    const EPOS_TABLE = document.querySelector(".eposTable")

    const EPOS_TIME = document.createElement("td");

    const EPOS_VENDOR = document.createElement("td");

    const EPOS_BANKCARD = document.createElement("td");

    const EPOS_PAYEE = document.createElement("td");

    const EPOS_AMOUNT = document.createElement("td");

    let arrayNum = 0;

    EPOS_TIME.textContent = `${EPOS_DATA[index].timestamp}`;

    EPOS_VENDOR.textContent = `${EPOS_DATA[index].vendor}`;

    EPOS_BANKCARD.textContent = `${EPOS_DATA[index].bankCardNumber}`;

    EPOS_PAYEE.textContent = `${EPOS_DATA[index].payeeAccount}`;

    EPOS_AMOUNT.textContent = `${EPOS_DATA[index].amount}`;
    EPOS_ROW.appendChild(EPOS_TIME, EPOS_VENDOR, EPOS_BANKCARD, EPOS_PAYEE, EPOS_AMOUNT);

    EPOS_TABLE.insertAdjacentElement("afterend", EPOS_ROW);

}



populateData(data);


function togglePane(newPane) {
    console.log("in toggle")
    console.log(newPane)
    document.getElementById("financialbutton").classList.remove("active")
    document.getElementById("associatesbutton").classList.remove("active")
    document.getElementById("vehiclesbutton").classList.remove("active")
    document.getElementById("wherebutton").classList.remove("active")

    document.getElementById("financialDiv").style.display = "none"
    document.getElementById("associatesDiv").style.display = "none"
    document.getElementById("vehiclesDiv").style.display = "none"
    document.getElementById("whereDiv").style.display = "none"

    if (newPane == "associates") {
        document.getElementById("associatesDiv").style.display = "block"
        document.getElementById("associatesbutton").classList.add("active")
    }
    else if (newPane == "financial") {
        document.getElementById("financialDiv").style.display = "block"
        document.getElementById("financialbutton").classList.add("active")
    }
    else if (newPane == "vehicles") {
        document.getElementById("vehiclesDiv").style.display = "block"
        document.getElementById("vehiclesbutton").classList.add("active")
    }
    else {
        document.getElementById("whereDiv").style.display = "block"
        document.getElementById("wherebutton").classList.add("active")
    }
}

let searchBtn = document.getElementById("srch-btn");
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let citizenId = document.getElementById("srch").value;
    getRequest(citizenId);
});








// EPOS_DATA.forEach(element => {
//     const tbodyEl = document.querySelector("tbody")
//     tbodyEl.innerHTML += `
// <tr> 
//     <td>${EPOS_DATA}</td>
// </tr>

// `










// const EPOS_DATA = data.data.eposTransactions
// forEach(populateDataEpos());
// console.log(data.data.ATMTransactions);

// EPOS_DATA.forEach(element => {
//     document.getElementById("epoTimeStamp")
// }
// )


// document.querySelector(".financeTable").innerHTML = "" + EPOS_DATA;


