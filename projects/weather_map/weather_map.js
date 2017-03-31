// $(document).ready(function () {
	const APPID = '7f8e3aa0aad113510e0c1eaafd1c17b8';
	var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
	var latitude = parseFloat($('#lat-input').val());
	var longitude = parseFloat($('#lon-input').val());
	var mapOptions = {
		zoom: 10,
		center: {
			lat: latitude,
			lng: longitude
		}
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var marker = new google.maps.Marker({
		position: map.center,
		map: map,
		animation: google.maps.Animation.DROP,
		draggable: true
	});
	var geocoder = new google.maps.Geocoder();

	function getWeather(Lat, Lon) {
		$.get(url, {
			APPID: APPID,
			lat: Lat,
			lon: Lon,
			cnt: 3,
			units: 'imperial'
		}).fail(function(data, status) {
			console.log(status);
			$.alert({
				title: 'Uh oh!',
				content: 'Weather failed to load! See console for details.',
				type: 'red',
				backgroundDismiss: true,
				animationBounce: 1.5,
				buttons: {
					close: function () {}
				}
			});
		}).done(function(data) {
			console.log(data);
			renderForecast(data.city.name, data.list);
		});
	}

	function renderForecast(cityName, list) {
		$('#forecast-container').html('<h4>' + (cityName ? cityName : 'No city selected') + '</h4>');
		list.forEach(function (element, index, array) {
			$('#forecast-container').append('<div class="day-forecast"><h4>' + Math.round(element.temp.max) + '°F / ' + Math.round(element.temp.min) + '°F</h4>' + '<p class="icon"><img src="http://openweathermap.org/img/w/' + element.weather[0].icon + '.png"></p>' + '<p><strong>' + element.weather[0].main + ':</strong> ' + element.weather[0].description + '</p><p><strong>Humidity:</strong> ' + element.humidity + '%</p><p><strong>Wind:</strong> <span>' + element.speed + 'mph</p><p><strong>Pressure:</strong> ' + element.pressure +'hPa</p></div>');
		});
	}

	function convertAddress() {
		var address = $('#address-input').val();
		geocoder.geocode({ 'address': address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				latitude = results[0].geometry.location.lat();
				longitude = results[0].geometry.location.lng();
				$('#lat-input').val(latitude);
				$('#lon-input').val(longitude);

			} else if (status != 'ZERO_RESULTS') {
				console.log(status);
				$.alert({
				title: 'Uh oh!',
				content: 'Geocoding failed! See console for details.',
				type: 'red',
				backgroundDismiss: true,
				animationBounce: 1.5,
				buttons: {
					close: function () {}
				}
			});
			}
		});
	}

	getWeather(29.42412, -98.493629);

	$('#get-weather').click(function () {
		if ($('#address-input').val() != '') {
			convertAddress();
		} else {
			latitude = parseFloat($('#lat-input').val());
			longitude = parseFloat($('#lon-input').val());
		}
		if (isNaN(latitude) || isNaN(longitude)) {
			$.alert({
				title: 'Invalid Location',
				content: 'Please input valid latitude and longitude values.',
				type: 'red',
				backgroundDismiss: true,
				animationBounce: 1.5
			});
		} else {
			getWeather(latitude, longitude);
			marker.setPosition(new google.maps.LatLng(latitude, longitude));
			map.panTo(marker.getPosition());
		}
	});

	$('#address-input').change(convertAddress);

	$('#lat-input').change(function(event) {
		latitude = parseFloat($('#lat-input').val());
	});

	$('#lat-input').keypress(function(event) {
		$('#address-input').val('');
	});

	$('#lon-input').keypress(function(event) {
		$('#address-input').val('');
	});

	$('#lon-input').focusout(function(event) {
		longitude = parseFloat($('#lon-input').val());
	});

	google.maps.event.addListener(marker, 'dragend', function(evt){
		latitude = parseFloat(evt.latLng.lat());
		longitude = parseFloat(evt.latLng.lng());
		$('#lat-input').val(latitude);
		$('#lon-input').val(longitude);
		getWeather(latitude, longitude);
	});
// });