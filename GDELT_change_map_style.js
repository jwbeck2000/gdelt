// Change the map style upon selection -- never implemented
	refreshChart_mapstyle = function(map_style) {
		var chart3 = $('#gdelt-diplocoop-count-map').highcharts();


		// console.log(chart3.user)
	    
	    chart3.update({
	    	chart:{map:'custom/' + map_style}
			}, false);
		
		chart3.redraw(true);
		};
