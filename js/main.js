(function(){

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


		$('.button').on('click',function(){
			$('#canvas').html ('');

			var selectedid = $(this).attr('id');
			console.log(selectedid);

			var filteredlist = subwayData.filter(function(subwayStation){
			return _.contains(subwayStation.lineList, selectedid); 
			});

			filteredlist.forEach(function(subwayStation){
			$('#canvas').append('<div class="name">' + subwayStation.name  + '</div>' + subwayStation.lineList.join(' - ') + '</div>' + '</br>'); 
			});

		});

	})

}).call(this);


