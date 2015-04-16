(function(){


	var templateHtml = $('#template').html();
	// console.log(templateHtml);

	// var templateFactory = _.template(templateHtml);

	d3.csv('data/DOITT_SUBWAY_ENTRANCE_01_13SEPT2010.csv', function(error, subwayData){
		if(error){
			console.log(error);
		}

		subwayData.forEach(function(subwayStation){
			var delimiter = '(';
			var subway_station_name_parts = subwayStation.name.split(delimiter);
			var subway_direction = subway_station_name_parts[1];
		
			if (subway_direction){
				subway_direction = subway_direction.replace(/\)/g, ' ');
				subwayStation.direction = subway_direction; 
			}

			subwayStation.name = subway_station_name_parts[0].trim();
		
			subwayStation.lineList = subwayStation.line.split('-');
		
		});

		// console.log(subwayData);

// template 입력한 부분 

		function lineEntrances(lineName){
			$('#canvas').html('');
	

			var selectedid = $( '.button' ).attr('data-subway');

			var filteredlist = subwayData.filter(function(subwayStation){
			return _.contains(subwayStation.lineList, selectedid); 
			})

			filteredList.forEach(function(subwayStation){
			$('#canvas').append( templateFactory(subwayStation) );
			});
		}

		$('.button').on('click',function(){
			var subway_line = $(this).attr('data-subway');
			lineEntrances(subway_line);

			// filteredlist.forEach(function(subwayStation){
			// $('#canvas').append('<div class="name">' + subwayStation.name  + '</div>' + subwayStation.lineList.join(' - ') + '</div>' + '</br>'); 
			// });

		});

	});

}).call(this);


