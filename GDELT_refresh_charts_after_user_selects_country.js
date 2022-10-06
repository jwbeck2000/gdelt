// Refresh charts when the user selects a country

refreshChart_whenCountrySelected = function(iso1iso2array) {
	$('select[id=quad-dropdown]').prop('disabled', true)
	var chart1 = $('#gdelt-diplocoop-count-map').highcharts();

	chart1.series[0].update({
		data: iso1iso2array,
	}, false);
	chart1.setTitle(null, {text: 'Select a country to populate its diplomatic events with other countries<br>Selected quadclass is currently: ' + initialQuad + ' and selected country is: ' + selectedCountry[0]['code'] + '.'});

	chart1.redraw(false);

	var chart2 = $('#bar-chart').highcharts();

	chart2.xAxis[0].update({
		categories:getISOcategories(iso1iso2array, 'code').slice(1)
			}, false);
	chart2.series[0].update({
		data:getISOcategories(iso1iso2array,'value').slice(1)
			}, false);

		chart2.redraw(false)
	};