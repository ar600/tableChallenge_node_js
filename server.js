var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'some-secret-key',
saveUninitialized: false,
resave: false
}));
app.use(express.static(__dirname + "/views"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// dummy Data from API
let dataFromAPI = {
  'UUID1': 'data1',
  'UUID2': 'data2',
  'UUID3': 'data3',
  'UUID4': 'data4',
  'UUID5': 'data5',
  'UUID6': 'data6',
  'UUID7': 'data7',
  'UUID8': 'data8',
  'UUID9': '<a href="www.google.com">hello</a>',
  'DATE': 'date',
  'TIME': 'time',
  'Number1': 'number',
  'Number2': 'number',
  'Number3': 'number',
  'Number4': 'number',
  'Number5': 'number',
  'Number6': 'number',
  'Number7': 'number',
  'Number8': 'number',
  'Number9': 'number',
  'Number10': 'number',
  'TEXT1': 'text',
  'TEXT2': 'text',
  'TEXT3': 'text',
  'TEXT4': 'text',
  'TEXT5': 'text',
  'TEXT6': 'text',
  'TEXT7': 'text',
  'TEXT8': 'text',
  'TEXT9': 'text',
  'TEXT10': 'text',
  'TEXT11': 'text',
  'TEXT12': 'text',
  'TEXT13': 'text',
  'TEXT14': 'text',
  'TEXT15': 'text',
  'TEXT16': 'text',
  'TEXT17': 'text',
  'TEXT18': 'text',
  'TEXT19': 'text',
  'TEXT20': 'text',
};
let updatedAPI={};

// +++++++++++++++++++++++++++++++++++++++++++
app.get('/', (req, res) => {
    res.locals.updatedAPI = req.session.updatedAPI || [];
    console.log("line 68",res.locals.updatedAPI);

    res.render('index', {updatedAPI:res.locals.updatedAPI, dataFromAPI:dataFromAPI});
  });

// +++++++++++++++++++++++++++++++++++++++++++
app.post('/filter', (req, res) => {
  console.log("Inside /filter");

  var requestedApi = req.body.tableData;

  console.log("requested Data sent from user , line 77",requestedApi);

  console.log("line 83, updatedAPI", updatedAPI);
  // for (key in dataFromAPI) {
  //   for (var i = 0; i < requestedApi.length; i++) {
  //     if (key.toLowerCase() == requestedApi[i]) {
  //         updatedAPI[key] = dataFromAPI[key];
  //       }
  //     }
  //   }

    for (var i = 0; i < requestedApi.length; i++) {
      console.log("line 92, requestedApi:" , requestedApi);
      if (requestedApi[i].toUpperCase() in dataFromAPI) {
        updatedAPI[requestedApi[i]] = dataFromAPI[requestedApi[i].toUpperCase()];
      }
    }
    console.log("updatedAPI array to be sent back to the FRONT, 127", updatedAPI);
    req.session.updatedAPI = updatedAPI;
    console.log("line 91",req.session.updatedAPI);
    res.redirect( '/');
  });
// +++++++++++++++++++++++++++++++++++++++++++++++++++=
app.post('/reset' , (req,res) => {
  console.log("line 93",updatedAPI);
  req.session.destroy();
  updatedAPI={};
  console.log("line 95",updatedAPI);
  res.redirect('/');
});

app.listen(8080, function() {
 console.log("listening on port 8080");
});
