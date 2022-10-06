//Populate dropdown for selecting map (deprecated)

let dropdown_map = document.getElementById("map-dropdown");
dropdown_map.length = 0;

dropdown_map.selectedIndex = 0;
let map_option2 = document.createElement('option');
map_option2.text = 'World Map';
map_option2.value = 'world-robinson';
dropdown_map.add(map_option2);
let map_option = document.createElement('option');
map_option.text = 'Africa';
map_option.value = 'africa';
dropdown_map.add(map_option);