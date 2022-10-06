// Refresh the charts after choosing a quadclass
	refreshChart_dropdown = function(quadclass_value) {
		$('select[id=quad-dropdown]').prop('disabled', false)
		initialQuad = quadclass_value

		var chart1 = $('#gdelt-diplocoop-count-map').highcharts();

		chart1.series[0].update({
			data: unique_isos[quadclass_value]
		}, false);

		chart1.setTitle(null, {text: 'Select a country to populate its diplomatic events with other countries<br>Selected quadclass is currently: ' + quadclass_value});

		chart1.redraw(false);

		var chart2 = $('#bar-chart').highcharts();

		chart2.xAxis[0].update({
			categories:[0]//getISOcategories(iso1iso2array, 'code')
				}, false);
		
		chart2.series[0].update({
			data:[0]//getISOcategories(iso1iso2array,'value')
				}, false);
		chart2.redraw(true);
		drilldown_on_click(ISOdrilldown_test);
		};