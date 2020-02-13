const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

//Render static files by using express.static method
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res) {
  var firstname = req.body.fName;
  var lastname = req.body.lName;
  var email = req.body.email;


  var data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  }

  var jsonData = JSON.stringify(data);

  var options = {
    url: 'https://us4.api.mailchimp.com/3.0/lists/0d52153518',
    method: 'POST',
    headers: {
      'Authorization': 'useinakbar c4715e618051482d131823af8761d0ad-us4'
    },
    // body:jsonData
  }

  request(options, function(error, response, body) {
    
    if(error) {
      res.sendFile(__dirname + '/failure.html');
    } else {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
      }
      else {
        res.sendFile(__dirname + '/failure.html');
      }
    }

  })
})

app.post('/failure', function(req, res) {
  res.redirect('/');
})

//List ID
// 0d52153518

//API key
// c4715e618051482d131823af8761d0ad-us4

app.listen(process.env.PORT || 3000, function() {
  console.log('Server is running on port 3000');
})
