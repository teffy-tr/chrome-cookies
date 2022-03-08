var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { cors: { origin: '*' } });
var Redis = require('ioredis');
var redis_address = process.env.REDIS_ADDRESS || 'localhost:6379';
var redis = new Redis();

redis.set('origins', '*:*');

redis.psubscribe('*', 
    function(err, count) {
        console.log(err);
        console.log(count);
    }
);

redis.subscribe(
    [
        'notification', 
    ], 
    function(err, count) {
        console.log(err);
    }
);

redis.on('message', function(channel, message) {
    console.log(channel + ': ' + message);
    try {
        message = JSON.parse(message);
    }
    catch (e) { }
    
    io.emit(channel, message);
});


http.listen(3000, function(){
    console.log('Listening on Port 3000');
});