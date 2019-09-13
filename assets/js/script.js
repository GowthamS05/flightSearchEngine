var postObj = {};
/*Show Notification*/
function showNotification(errMsg) {
    let x = document.getElementById("notificationBar");
    let y = document.getElementById("notificationMessage");
    y.innerHTML = errMsg;
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function checkValidArivalDeparture() {
    let depVal = document.getElementById('departurePlace').value;
    let arrivalVal = document.getElementById('returnPlace').value;
    let depValBoolean = departureArr.some(val => val === depVal);
    let arrvalBoolean = returnArr.some(val => val === arrivalVal);
    if (depValBoolean && arrvalBoolean) {
        return true;
    } else {
        this.showNotification("Enter valid Arrival Departure Place");
        return false;
    }
}
//reset fields
function resetFields() {
    document.getElementById('departurePlace').value = '';
    document.getElementById('returnPlace').value = '';
    document.getElementById('monthDep').value = '';
    document.getElementById('dayDep').value = '';
    document.getElementById('yearDep').value = '';
    document.getElementById('monthArrival').value = '';
    document.getElementById('dayArrival').value = '';
    document.getElementById('yearArrival').value = '';
    document.getElementById('choosePassengers').value = '';
    document.getElementById('chooseClass').value = '';
    document.getElementById('chooseSort').value = '';
    document.getElementById('chooseFilter').value = '';
    document.getElementById('filterValue').value = '';
    document.getElementById('chooseSort').value = '';
    document.getElementById('chooseFilter').value = '';
    document.getElementById('filterValue').value = '';
    document.getElementById('filterValue').disabled = true;
    document.getElementById('filterBtn').disabled = true;
    document.getElementById('dayDep').disabled = true;
    document.getElementById('yearDep').disabled = true;
    document.getElementById('dayArrival').disabled = true;
    document.getElementById('yearArrival').disabled = true;
    if ((document.getElementById('accordion').children).length > 0) {
        let searchCardList = document.getElementById('accordion').children;
        for (let i = 0; i < searchCardList.length; i++) {
            searchCardList[i].style.display = 'none';
        }
    }
}

function submitSearch() {
    let _departurePlace = document.getElementById('departurePlace').value;
    let _returnPlace = document.getElementById('returnPlace').value;
    let _monthDep = document.getElementById('monthDep').value;
    let _dayDep = document.getElementById('dayDep').value;
    let _yearDep = document.getElementById('yearDep').value;
    let _monthArrival = document.getElementById('monthArrival').value;
    let _dayArrival = document.getElementById('dayArrival').value;
    let _yearArrival = document.getElementById('yearArrival').value;
    let _choosePassengers = document.getElementById('choosePassengers').value;
    let _chooseClass = document.getElementById('chooseClass').value;
    if (_departurePlace.trim() != '' && _returnPlace.trim() != '' && _monthDep.trim() != '' && _dayDep.trim() != '' && _yearDep.trim() != '' && _choosePassengers.trim() != '' && _chooseClass.trim() != '') {
        if (checkValidArivalDeparture()) {
            if (fetchDateDetails()) {
                postObj['depaturePlace'] = _departurePlace;
                postObj['returnPlace'] = _returnPlace;
                postObj['chooseClass'] = _chooseClass;
                postObj['choosePassengers'] = _choosePassengers;
                postObj['departureDate'] = flightDepartureDate;
                postObj['arrivalDate'] = flightArivalDate;
                postObj['tabid'] = document.getElementsByClassName("active")[0].id;
                postObj['tabName'] = document.getElementsByClassName("active")[0].innerText;
                postObj['fromCode'] = (_departurePlace.split("(")[1]).substring(0, 3);
                postObj['toCode'] = (_returnPlace.split("(")[1]).substring(0, 3);

                if (postObj) {
                    generateResult(postObj['tabName'], postObj);
                }
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        this.showNotification('Enter All the Fields which are Mandatory');
        return false;
    }
}

function enableFilteredResult() {
    console.log(document.getElementById('chooseFilter').value);
    document.getElementById('filterValue').removeAttribute('disabled');
    document.getElementById('filterBtn').removeAttribute('disabled');
}


function filterValues(val) {
    let filteredFullList = fullList;
    if (val.trim()) {
        let filterVal = +val;
        if (document.getElementById('chooseFilter').value === 'Price') {
            filteredFullList = filteredFullList.filter(function(obj) {
                let sumOfPrice = (+((obj.priceSingle.split(',')).join(""))) + (+((obj.priceReturn.split(',')).join("")));
                if (+val === sumOfPrice) {
                    return obj;
                }
            })
        }

        renderCards(filteredFullList)
    } else if (val.trim() == '') {
        if (fullList[0].mode == 'ROUND TRIP') {
            if (postObj['tabName']) {
                generateResult(postObj['tabName'], postObj)
            }
        }
        if (fullList[0].mode == 'ONE WAY') {
            if (postObj['tabName']) {
                generateResult(postObj['tabName'], postObj)
            }
        }
    }
}

function enableSortResult(value) {
    let filteredFullList = fullList;

    function compare(a, b) {
        let val1 = (+((a.priceSingle.split(',')).join(""))) + (+((a.priceReturn.split(',')).join("")));
        let val2 = (+((b.priceSingle.split(',')).join(""))) + (+((b.priceReturn.split(',')).join("")));
        if (value === 'desc') {
            if (val1 > val2) {
                return -1;
            }
            if (val2 < val1) {
                return 1;
            }
        }
        if (value === 'asc') {
            if (val1 < val2) {
                return -1;
            }
            if (val2 > val1) {
                return 1;
            }
        }
        return 0;
    }
    filteredFullList.sort(compare);
    renderCards(filteredFullList)

}