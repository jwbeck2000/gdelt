//Populate dropdown for selecting quadclass

let dropdown_quadchart = document.getElementById("quad-dropdown");
dropdown_quadchart.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose quadclass';

dropdown_quadchart.add(defaultOption);
dropdown_quadchart.selectedIndex = 0;

var quadclassList = Object.keys(reformattedGdeltData);
let option;
for (let i = 0; i < quadclassList.length; i++) {
	option = document.createElement('option');
	option.text = quadclassList[i];
	option.value = quadclassList[i];
	dropdown_quadchart.add(option);
}