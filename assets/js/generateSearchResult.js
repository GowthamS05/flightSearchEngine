var fullList;

function generateResult(tabName, postObject) {
    fullList = flightListSingleReturn;

    fullList = fullList.data.filter(obj => obj.mode === tabName);
    fullList = fullList.filter(obj => obj.fromToPlace === (`${postObject['fromCode']}-${postObject['toCode']}`));
    renderCards(fullList);
    openTab('searchResults', 'searchTab');

}

function renderCards(filfullList) {
    if ((document.getElementById('accordion').children).length > 0) {
        let searchCardList = document.getElementById('accordion').children;
        for (let i = 0; i < searchCardList.length; i++) {
            searchCardList[i].style.display = 'none';
        }
    }
    const container = document.getElementById('accordion');
    if (filfullList.length > 0) {

        filfullList.forEach((result, idx) => {
            var content = '';
            // Create card element
            // Construct card content
            if (filfullList[0].mode === 'ONE WAY') {

                var content = `
        <div id="cardId${idx}" class="card shadow1">
        <table class="cardTable">
            <tr>
            <td>
            <img src=${result.imgSingle} class="flightImagesNew">
            </td>
     <td class="fontSize12">
     ${result.fromPlaceSingle}
     </td>
     <td>
     <u>${result.calculatedTimeSingle}<u><br/>
     <span class="grey fontSize11">${result.numberofStopsSingle} stop</span>
     
     </td>
     <td class="fontSize12">
     ${result.toPlaceSingle}
     </td>
     <td colspan=2>
     <b class="priceFont">₹ ${result.priceSingle}<b></td>
            </tr>
            <tr>
            <td class="fontSize11 grey">${result.flightNameSingle}</td>
                   <td class="fontSize16"><b>${result.startTimeSingle}</b></td>
             <td class="grey fontSize11 hiddenClass">refundable</td>
            <td class="fontSize16"><b>${result.endTimeSingle}</b></td>
            <td class="red fontSize11"><b>In Offer Avail soon</b></td>    
            </tr>
            </table>
     </div>
       `;
            } else if (filfullList[0].mode === 'ROUND TRIP') {
                var content = `
            <table class="cardTable">
            <tr>
            <td>
            <div id="cardId${idx}" class="card shadow1">
             <table class="cardTable">
             <tr>
             <td>
             <img src=${result.imgSingle} class="flightImagesNew">
             </td>
      <td class="fontSize12">
      ${result.fromPlaceSingle}
      </td>
      <td>
      <u>${result.calculatedTimeSingle}<u><br/>
      <span class="grey fontSize11">${result.numberofStopsSingle} stop</span>
      
      </td>
      <td class="fontSize12">
      ${result.toPlaceSingle}
      </td>
      <td colspan=2>
      <b class="priceFont">₹ ${result.priceSingle}<b></td>
             </tr>
             <tr>
             <td class="fontSize11 grey">${result.flightNameSingle}</td>
                    <td class="fontSize16"><b>${result.startTimeSingle}</b></td>
              <td class="grey fontSize11 hiddenClass">refundable</td>
             <td class="fontSize16"><b>${result.endTimeSingle}</b></td>
             <td></td>
              </tr>
                 </table>
          </div>
          </td>
          <td>
          <div class="card shadow1">
           <table class="cardTable">
           <tr>
           <td>
           <img src=${result.imgReturn} class="flightImagesNew">
           </td>
    <td class="fontSize12">
    ${result.fromPlaceReturn}
    </td>
    <td>
    <u>${result.calculatedTimeReturn}<u><br/>
    <span class="grey fontSize11">${result.numberofStopsReturn} stop</span>
    
    </td>
    <td class="fontSize12">
    ${result.toPlaceReturn}
    </td>
    <td colspan=2>
    <b class="priceFont">₹ ${result.priceReturn}<b></td>
           </tr>
           <tr>
           <td class="fontSize11 grey">${result.flightNameReturn}</td>
                  <td class="fontSize16"><b>${result.startTimeReturn}</b></td>
            <td class="grey fontSize11 hiddenClass">refundable</td>
           <td class="fontSize16"><b>${result.endTimeReturn}</b></td>
           <td></td>
            </tr>
               </table>
        </div>
        </td>
          <td>
          <button type="button" class="btn btnOrange priceBtn">₹ ${result.totalFare}</button>
          </td>
          </tr>
          </table>
            `;
            }
            // Append newyly created card element to the container
            container.innerHTML += content;
        });
    }

}