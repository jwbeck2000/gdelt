//Enable click-to-select-country functionality
var iso1iso2array = [];
var selectedCountry = [{'code':null, 'value':0, 'color':'gold'}];

function isoSelector(selectedISO, initialQuad){
	if (selectedISO == selectedCountry[0]['code']) {
		selectedCountry[0]['code'] = null;
		iso1iso2array.length=1;
		refreshChart_dropdown(initialQuad);
		document.getElementById("bar-chart").style.display = "none";
		document.getElementById("data-example").style.display = "none";

		}
	else if ((selectedCountry[0]['code'] != null) && (selectedISO != selectedCountry[0]['code'])) {
		drilldown_on_click("'" + selectedISO + "'")
		document.getElementById("data-example").style.display = "block";
	}
	
	else {
		selectedCountry[0]['code'] = selectedISO
		iso1iso2array.length=1;
		iso1iso2array = [selectedCountry][0];
		for (i = 0; i < reformattedGdeltData[initialQuad].length; i++) {
	    	if (reformattedGdeltData[initialQuad][i]['ISO_1'] == selectedISO) {
	    		iso1iso2array.push({
	    			'code':reformattedGdeltData[initialQuad][i]['ISO_2'], 
	    			'value':reformattedGdeltData[initialQuad][i]['value']
	    	})}
	    	else if (reformattedGdeltData[initialQuad][i]['ISO_2'] == selectedISO) {
	    		iso1iso2array.push({
	    			'code':reformattedGdeltData[initialQuad][i]['ISO_1'], 
	    			'value':reformattedGdeltData[initialQuad][i]['value']
					}
				)
			}
		};
    iso1iso2array.sort(function(a, b) {return parseFloat(a.value)-parseFloat(b.value)});
    	refreshChart_whenCountrySelected(iso1iso2array);
	document.getElementById("bar-chart").style.display = "block";

	}
	
    };