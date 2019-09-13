let flightDepartureDate = '';
let flightArivalDate = '';

function checkMonth(value, month, day, year) {
    if (value <= 12) {
        document.getElementById(day).removeAttribute('disabled');

        return true;
    } else {
        this.showNotification(' Enter Valid month in the input ');
        document.getElementById(month).value = '';
        document.getElementById(day).value = '';
        document.getElementById(year).value = '';
        document.getElementById(day).disabled = true;
        document.getElementById(year).disabled = true;
        return false;
    }
}

function checkDay(value, month, day, year) {
    let monthValue = ((+document.getElementById(month).value) * 1).toString();
    let monthdays = {
        "1": 31,
        "2": 28,
        "3": 31,
        "4": 30,
        "5": 31,
        "6": 30,
        "7": 31,
        "8": 31,
        "9": 30,
        "10": 31,
        "11": 30,
        "12": 31
    }
    if (value <= monthdays[monthValue]) {
        document.getElementById(year).removeAttribute('disabled');
        return true;
    } else {
        this.showNotification(' Enter Valid day in the input ');
        document.getElementById(day).value = '';
        document.getElementById(year).value = '';
        document.getElementById(year).disabled = true;
        return false;
    }
}

function checkYear(value, month, day, year) {
    let dt = new Date();
    let currentYear = dt.getFullYear();
    if (value >= currentYear && value <= currentYear + 100) {
        return true;
    } else {
        this.showNotification(' Enter Valid year in the input');
        document.getElementById(year).value = '';
        return false;
    }
}

//Obtain Date info
function fetchDateDetails() {
    let dayArrival = '' + document.getElementById('dayArrival').value;
    let monthArrival = '' + document.getElementById('monthArrival').value;
    let yearArrival = '' + document.getElementById('yearArrival').value;
    let monthDeparture = '' + document.getElementById('monthDep').value;
    let dayDeparture = '' + document.getElementById('dayDep').value;
    let yearDeparture = '' + document.getElementById('yearDep').value;


    if (dayArrival && monthArrival && yearArrival) {
        flightArivalDate = `${monthArrival}/${dayArrival}/${yearArrival}`;

    } else {
        this.showNotification("There is no end date is choosen");
    }
    if (monthDeparture && dayDeparture && yearDeparture) {

        flightDepartureDate = `${monthDeparture}/${dayDeparture}/${yearDeparture}`;
    } else {
        this.showNotification("There no start Date is choosen");
    }
    console.log('startDate', new Date(flightDepartureDate));
    console.log('endDate', new Date(flightArivalDate));
    if (!(new Date(flightArivalDate) >= new Date(flightDepartureDate))) {
        document.getElementById('dayArrival').value = '';
        document.getElementById('monthArrival').value = '';
        document.getElementById('yearArrival').value = '';
        document.getElementById('dayArrival').disabled = true;
        document.getElementById('yearArrival').disabled = true;
        this.showNotification('End Date Greater than Start Date');

        return false;
    } else {
        return true;
    }
}