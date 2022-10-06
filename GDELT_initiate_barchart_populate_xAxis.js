// Populate bar chart xAxis
    function getISOcategories(array, category){
		var rgdCategories =[]
	    for (i = 0; i < array.length; i++) {
	    	rgdCategories.push(array[i][category])
    		}
    	return rgdCategories
    	};

// Initiate the bar chart
    Highcharts.chart('bar-chart', {
	    chart: {
	        type: 'bar'
	    },
	    title: {
	        text: 'Events by country'
	    },
	    subtitle: {
	        text: 'Clicking a bar will populate a table below.'
	    },
	    legend: {
	    	enabled:false,
	    },

	    xAxis: {
	        categories: getISOcategories(iso1iso2array, 'code'), //['Africa', 'America', 'Asia', 'Europe', 'Oceania']
	        // linkedTo: 'Counts',
	        title: {
	            text: null
	        }
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Event counts',
	            align: 'high'
	        },
	        labels: {
	            overflow: 'justify'
	        }
	    },
	    plotOptions: {
	        allowPointSelect: false,
	        bar: {
	            dataLabels: {
	                enabled: true
	            }
	        },
	        series: {
	            point: {
	                events: {
	                    click: function(){
	                    	drilldown_on_click("'" + this.category + "'");
	                    	document.getElementById("data-example").style.display = "block";
	                    	$('example-table').dataTable({
	                    		searching:true,
	                    		info:true
	                    	})
						}
					}
				}
			}

	    },
	    credits: {
	        enabled: false
	    },
	    series: [{
	        dataSorting: {
	        enabled: false
	    		},
	        data: getISOcategories(iso1iso2array, 'value'), //[50, 100, 150, 200, 20]//
	    }]
	});