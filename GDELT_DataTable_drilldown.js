

// Fill a table with raw GDELT data upon drilldown
	var loadData;
 	
	const ISOdrilldown_test = '"SDN"'


    alasql.promise('select * from TSV("./GDELT excerpt.txt",{headers:true, autoExt:false}) where ISO_1 = '+ ISOdrilldown_test+' or ISO_2 = '+ ISOdrilldown_test+' and Quadclass = "'+initialQuad+'";').then(function(res){                   
	     loadData = res;
	     loadResults()})
    var loadResults = function () {
  
		exampleTable = $('#data-example').DataTable( {
		    data: loadData,
		    scrollY:        "80vh",
		    scrollX:        true,
		    scrollCollapse: true,
		    paging: false,
		    info: false,
		    searching: false,
		    // buttons: [
			   //  'copy',
			   //  'csv',
			   //  'excel',
			   //  'pdf',
			   //  'print'
		    // ],
		    // dom: 'Bfrtip',
		    columns: [
			 {'data': 'ISO_1', 'title': 'ISO_1'},
		     {'data': 'Quadclass', 'title': 'Quadclass'},
			 {'data': 'ISO_2', 'title': 'ISO_2'},
		     {'data': 'GLOBALEVENTID', 'title': 'GLOBALEVENTID'},
			 {'data': 'SQLDATE', 'title': 'SQLDATE'},
			 {'data': 'SOURCEURL', 'title': 'SOURCEURL'},
			 {'data': 'MonthYear', 'title': 'MonthYear'},
			 {'data': 'Year', 'title': 'Year'},
			 {'data': 'FractionDate', 'title': 'FractionDate'},
			 {'data': 'Actor1Code', 'title': 'Actor1Code'},
			 {'data': 'Actor1Name', 'title': 'Actor1Name'},
			 {'data': 'Actor1CountryCode', 'title': 'Actor1CountryCode'},
			 {'data': 'Actor1KnownGroupCode', 'title': 'Actor1KnownGroupCode'},
			 {'data': 'Actor1EthnicCode', 'title': 'Actor1EthnicCode'},
			 {'data': 'Actor1Religion1Code', 'title': 'Actor1Religion1Code'},
			 {'data': 'Actor1Religion2Code', 'title': 'Actor1Religion2Code'},
			 {'data': 'Actor1Type1Code', 'title': 'Actor1Type1Code'},
			 {'data': 'Actor1Type2Code', 'title': 'Actor1Type2Code'},
			 {'data': 'Actor1Type3Code', 'title': 'Actor1Type3Code'},
			 {'data': 'Actor2Code', 'title': 'Actor2Code'},
			 {'data': 'Actor2Name', 'title': 'Actor2Name'},
			 {'data': 'Actor2CountryCode', 'title': 'Actor2CountryCode'},
			 {'data': 'Actor2KnownGroupCode', 'title': 'Actor2KnownGroupCode'},
			 {'data': 'Actor2EthnicCode', 'title': 'Actor2EthnicCode'},
			 {'data': 'Actor2Religion1Code', 'title': 'Actor2Religion1Code'},
			 {'data': 'Actor2Religion2Code', 'title': 'Actor2Religion2Code'},
			 {'data': 'Actor2Type1Code', 'title': 'Actor2Type1Code'},
			 {'data': 'Actor2Type2Code', 'title': 'Actor2Type2Code'},
			 {'data': 'Actor2Type3Code', 'title': 'Actor2Type3Code'},
			 {'data': 'IsRootEvent', 'title': 'IsRootEvent'},
			 {'data': 'EventCode', 'title': 'EventCode'},
			 {'data': 'EventBaseCode', 'title': 'EventBaseCode'},
			 {'data': 'EventRootCode', 'title': 'EventRootCode'},
			 {'data': 'QuadClass', 'title': 'QuadClass'},
			 {'data': 'GoldsteinScale', 'title': 'GoldsteinScale'},
			 {'data': 'NumMentions', 'title': 'NumMentions'},
			 {'data': 'NumSources', 'title': 'NumSources'},
			 {'data': 'NumArticles', 'title': 'NumArticles'},
			 {'data': 'AvgTone', 'title': 'AvgTone'},
			 {'data': 'Actor1Geo_Type', 'title': 'Actor1Geo_Type'},
			 {'data': 'Actor1Geo_FullName', 'title': 'Actor1Geo_FullName'},
			 {'data': 'Actor1Geo_CountryCode', 'title': 'Actor1Geo_CountryCode'},
			 {'data': 'Actor1Geo_ADM1Code', 'title': 'Actor1Geo_ADM1Code'},
			 {'data': 'Actor1Geo_Lat', 'title': 'Actor1Geo_Lat'},
			 {'data': 'Actor1Geo_Long', 'title': 'Actor1Geo_Long'},
			 {'data': 'Actor1Geo_FeatureID', 'title': 'Actor1Geo_FeatureID'},
			 {'data': 'Actor2Geo_Type', 'title': 'Actor2Geo_Type'},
			 {'data': 'Actor2Geo_FullName', 'title': 'Actor2Geo_FullName'},
			 {'data': 'Actor2Geo_CountryCode', 'title': 'Actor2Geo_CountryCode'},
			 {'data': 'Actor2Geo_ADM1Code', 'title': 'Actor2Geo_ADM1Code'},
			 {'data': 'Actor2Geo_Lat', 'title': 'Actor2Geo_Lat'},
			 {'data': 'Actor2Geo_Long', 'title': 'Actor2Geo_Long'},
			 {'data': 'Actor2Geo_FeatureID', 'title': 'Actor2Geo_FeatureID'},
			 {'data': 'ActionGeo_Type', 'title': 'ActionGeo_Type'},
			 {'data': 'ActionGeo_FullName', 'title': 'ActionGeo_FullName'},
			 {'data': 'ActionGeo_CountryCode', 'title': 'ActionGeo_CountryCode'},
			 {'data': 'ActionGeo_ADM1Code', 'title': 'ActionGeo_ADM1Code'},
			 {'data': 'ActionGeo_Lat', 'title': 'ActionGeo_Lat'},
			 {'data': 'ActionGeo_Long', 'title': 'ActionGeo_Long'},
			 {'data': 'ActionGeo_FeatureID', 'title': 'ActionGeo_FeatureID'},
			 {'data': 'DATEADDED', 'title': 'DATEADDED'}
			 ],
		    columnDefs: [{
			"defaultContent": "-",
			"targets": "_all"
		    }]
		})
	};
    

	drilldown_on_click = function(ISOdrilldown) {
		exampleTable.destroy();
	    alasql.promise('select * from TSV("./GDELT excerpt.txt",{headers:true, autoExt:false}) where ISO_1 in ('+ ISOdrilldown+',"'+selectedCountry[0]['code']+'") and ISO_2 in ('+ ISOdrilldown+',"'+selectedCountry[0]['code']+'") and Quadclass = "'+initialQuad+'" limit 100;').then(function(res){                   
	         loadData = res;
	         loadResults();                  
	    })
	};

	
    // exampleTable.draw()
  //   function alignColumns() { 

		// exampletable = $('#data-example').DataTable();
		// exampleTable.columns.adjust().draw()
	 //    };