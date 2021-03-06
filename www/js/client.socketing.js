	// set up your socket

	var socket = io.connect('http://' + location.host, {
		'reconnect': true,
		'reconnection delay': 50,
		'max reconnection attempts': 300
	});

	socket.on('connect', function(){
		notie.alert(1, '<i class="fa fa-desktop"></i> Connected to the server!', 3);
	});

	socket.on('connect_error', function(){
		console.log('WebSocket Connection error...');
	});

	socket.on('disconnect', function(){
		notie.alert(3, '<i class="fa fa-plug"></i> Disconnected. Trying to reconnect... <i class="fa fa-refresh fa-spin"></i>', 0);
	})

	// receiving initCards, initialize the UI
	socket.on('initCards', function(initData){
		events.emit('renderInitCards', initData);
	});

	// handle the new RFCode. Show a snackbar.
	socket.on('newRFCode', function(data){
		var _code = data.code;
		events.emit('renderSnackbar', _code);
	});

	// Randomize Cards, new shake detected on a mobile device
	socket.on('randomizeCards', function(){
		$('#cards_container').mixItUp('sort', 'random', true);
	});

	// commute the button on the UI.
	socket.on('uiSwitchToggle', function(data){
		$('#switch-'+data.card_id).prop('checked', data.set);
		if (data.sound) ion.sound.play('switch-toggle'); // sound notification
	});

	// trigger Alarm
	socket.on('uiTriggerAlarm', function(card){
		events.emit('uiTriggerAlarm', card);
	});

	// need to update card dropdown menu mute status
	socket.on('uiMuteStatus', function(data){
		events.emit('uiMuteStatus', data);
	});

	// need to update card dropdown menu arm/disarm status
	socket.on('uiArmStatus', function(data){
		events.emit('uiArmStatus', data);
	});

	socket.on('serverError', function(data){
		// notie.js alert
		// TODO

	});


