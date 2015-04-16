(function(){


	var templateHtml = $('#template').html();

	var templateFactory = _.template(templateHtml);

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

// template 입력한 부분 

		function lineEntrances(lineName)
			$('#canvas').html('');
	

			var selectedid = $(this).attr('id');

			var filteredlist = subwayData.filter(function(subwayStation){
				return _.contains(subwayStation.lineList, selectedid); 
				})

			filteredList.forEach(function(subwayStation){
				console.log(filteredlist)
				$('#canvas').append( templateFactory(entrance) );
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


