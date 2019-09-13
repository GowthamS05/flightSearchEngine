/*filter the lists*/
function onPlaceChange(textBoxId, listId) {
    let input, filter, ul, li, liElem, i, txtValue;
    input = document.getElementById(textBoxId);
    filter = input.value.toUpperCase();
    ul = document.getElementById(listId);
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        liElem = li[i];
        txtValue = liElem.textContent || liElem.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }

}
/*shows list on click of textbox*/
function showDiv(textBoxId, listId) {
    let liList = (document.getElementById(listId)).getElementsByTagName("li");
    for (var i = 0; i < liList.length; i++) {
        (liList[i]).style.display = "block";
    }
    let li = document.getElementById(listId);
    li.classList.add("override");
}

/*Generate List Departure*/

function hideDiv(ul) {
    let liList = (document.getElementById(ul)).getElementsByTagName("li");
    for (var i = 0; i < liList.length; i++) {
        (liList[i]).style.display = "none";
    }
    let li = document.getElementById(ul);
    li.classList.remove("override");
}

var selectPlace = function(ids, ul, li, textBox) {
    console.log(document.getElementById(ids).innerHTML);
    document.getElementById(textBox).value = document.getElementById(ids).innerHTML;
    hideDiv(ul);
}

var generateList = function(array, eventfn, ul, li, textbox) {
    let cnt = 0;
    array.forEach(function(item) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(item);
        node.appendChild(textnode);
        node.setAttribute("id", li + (cnt++));
        node.addEventListener("click", () => { eventfn(node.getAttribute("id"), ul, li, textbox) });
        document.getElementById(ul).appendChild(node);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    generateList(departureArr, selectPlace, 'chooseDepartureUl', 'choosDepartureLi', 'departurePlace');
    generateList(returnArr, selectPlace, 'chooseReturnUl', 'choosReturnLi', 'returnPlace');

}, false);
/*Generate List Departure*/