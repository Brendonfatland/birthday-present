var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Message = require('./models/message');

// app.use(bodyParser.urlencoded({extended: true})); /he urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
var server = http.Server(app);

//----------------------------------------------------------------------------------------------
//Database connection.
var options = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
mongoose.connect('mongodb://localhost/chat-room-dev', options); // chat-room-dev is the database.
mongoose.connection.on('connected', function(ref) {
}); //when connected we try to apply express application
process.on('SIGINT', function() { //When you use control in gitbash, this event catches it and shuts down database.
    console.log("Caught interrupt signal");
    mongoose.disconnect(function() {
        console.log("disconnected perfectly.");
        process.exit();
    });
});
// --------------------------------------------------------------------------------------------------
// Endpoints
// var create = function(name, content) {
//     var snippet = {
//         name: name,
//         content: content
//     };
//     Snippet.create(snippet, function(err, snippet) {
//         if (err || !snippet) {
//             console.error("Could not create snippet", name);
//             mongoose.disconnect();
//             return;
//         }
//         console.log("Created snippet", snippet.name);
//         mongoose.disconnect();
//     });
// };

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
app.post('/comments', (req, res) => {
  console.log(req.body)
})



server.listen(3000, function() {
    console.log('listening on *:3000');
});
