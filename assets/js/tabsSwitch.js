function openTab(tabId, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
    tablinks = document.getElementsByClassName("tabItem")
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active')
    }
    document.getElementById(tabName).classList.add('active');
    if (tabName === 'singleTab') {
        document.getElementById('destDate').style.visibility = "hidden";
        document.getElementById('monthArrival').value = document.getElementById('monthDep').value;
        document.getElementById('dayArrival').value = document.getElementById('dayDep').value;
        document.getElementById('yearArrival').value = document.getElementById('yearDep').value;

    } else {
        document.getElementById('monthArrival').value = '';
        document.getElementById('dayArrival').value = '';
        document.getElementById('yearArrival').value = '';
        document.getElementById('dayArrival').disabled = true;
        document.getElementById('yearArrival').disabled = true;
        document.getElementById('destDate').style.visibility = "visible";
    }
}