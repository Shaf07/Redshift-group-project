var test = "hello"
console.log(test)


let searchBtn = document.getElementById("srch-btn");
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let citizenId = document.getElementById("srch").value;
    getRequest(citizenId);
});


//Address to api
const ADDR = "http://localhost:5015";

const getRequest = async (citizenId) => {
    try {

        testData = await axios.get(`${ADDR}/api/citizens/search/${citizenId}`);
        localStorage.setItem('Data', JSON.stringify(testData));
        window.location.href = "./pages/profile.html";

        //populateData();
    } catch (err) {
        console.log(err)
    }
}


