let searchBtn = document.getElementById("srch-btn");
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let citizenId = document.getElementById("srch").value;
    getRequest(citizenId);
});


// const spinnerDiv = createElement("div");
// spinnerDiv.className = "spinner-wrapper"
// const spinWrapper = document.createElement("div")
// spinWrapper.className = "spinner"
// if (window.location.href = "profile.html") {
//     console.log("LETS GO")
// }

//Address to api
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