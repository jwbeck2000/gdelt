

// Initiate the world choropleth chart
	var initialQuad = quadclassList[0]
	var initialMapView = 'world-robinson'

    Highcharts.mapChart('gdelt-diplocoop-count-map', {
        chart: {
            map: 'custom/' + initialMapView  // map: 'custom/world-robinson'
        },

        title: {
            text: '',
	    	align: 'left'
        },

        subtitle: {
        	text: 'Select a country to populate its diplomatic events with other countries<br>Selected quadclass is currently: ' + initialQuad + ' and no country is currently selected.',
        	align: 'left'
        },

        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false
        },

		credits: {
			enabled: false
		},


		colorAxis: {
            min: 0,
            type: 'linear',
        },

        tooltip: {
        	headerFormat: null,
        	pointFormat: '{point.name}'
        },

        series: [{
            data: unique_isos[initialQuad],
            joinBy: ['iso-a3', 'code'],
            name: 'GDELT Event Count',
            allowPointSelect: true,
            states: {
                hover: {
                    color: 'gold'
                },
 
            },
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                formatter: function () {
                    if (this.point.value) {
                        return this.point.name;
	                    }
	                }
	            },
	        },
        	// {data: selectedCountry,
        	// joinBy: ['iso-a3', 'code'],
        	// //color: '#a4edba'
        	// }
        ],
        plotOptions: {
        	series: {
        		point: {
        			events: {
        				click: function(){
        					isoSelector(this.code, initialQuad)        					
        				}
        			}
        		}
        	}
        }
    });