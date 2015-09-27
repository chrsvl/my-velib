var VelibAPI = {
	updateStationInfo: function(stationId, callback) {
		$.getJSON(VelibAPI.buildURL(stationId), function(station) {
		  callback(station);
		}).fail(function() {
    	console.log( "error" );
  	})
	},
	buildURL: function(stationId) {
		return 'https://api.jcdecaux.com/vls/v1/stations/'+ stationId +'?contract=paris&apiKey=42e7b4b2042ebdcf5a88888d3a88edfa2018fa15';
	}
};

var App = {
	station_ids: [7022, 8013],

	init: function() {
		$("#refresh a").click(function() {
			App.fetch();
		});
		App.fetch();
	},
	fetch: function() {
		App.station_ids.forEach(function(id) {
			VelibAPI.updateStationInfo(id, function(station) {
				App.renderStation(station);
			});
		});
	},
	renderStation: function(station) {
		var source = $('#station-template').html();
		Handlebars.registerHelper('timeAgo', function(timestamp) {
			var lastUpdate = moment.unix(timestamp/1000);
			return lastUpdate.fromNow();
		});
		var template = Handlebars.compile(source);
		$('#station-'+station.number).remove();
		$('#stations').append(template(station));
	},
};