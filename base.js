var getTrends = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&offset=";
var offset = 0;
var clear = false;


$(document).ready(function(){
	// Function to show data
	function render(dataSet){
    	dataSet.data.forEach(function(item,i){
    	var gif = dataSet.data[i].images.fixed_height.url;
    	$("#main").append("<img class='img-thumbnail'src='" + gif + "'>"); // mind the single vs. double quotes!
    	});
	};

	//Loads trending gifs on initial load
	$.get(getTrends, render);

	// Event listener on input field for new search strings.
	// Text entered in th e
	$('input').on("change", function (event) {
     	var	searchApi = 'http://api.giphy.com/v1/gifs/search?q=' + event.target.value + '&api_key=dc6zaTOxFJmzC';
     	// Removes current images and replaces using search input
     	$('img').remove();
		$.get(searchApi, render);
	});

	//Loads 25 more gifs upon click, although rendering this many gifs on the page takes a long time to load.
	$('#more').on('click', function(event){
		if (clear === true){
			$.get(getTrends, render);
			return clear = false;
		} else {
			offset += 25;
			var incGifs = getTrends + offset;
			$.get(incGifs, render);
			$('body').animate({scrollTop: 50000}, 2500);
		};
	});

	$('#reset').on('click', function(event){
		offset = 0;
		clear = true;
		$('img').remove();
	});
});