const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https')
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

//Render static files by using express.static method
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
})

app.get('/issuescontact', function(req, res) {
  res.sendFile(__dirname + '/contact.html');
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

  const jsonData = JSON.stringify(data);
  const url = 'https://us4.api.mailchimp.com/3.0/lists/0d52153518';
  const options = {
    method: 'POST',
    auth: 'useinakbar:c4715e618051482d131823af8761d0ad-us4'
  }

const request = https.request(url, options, function(response) {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }


  response.on('data', function(data) {
    console.log(JSON.parse(data));
  })
})

    request.write(jsonData);
    request.end();




});

app.post('/success', function(req, res) {
  res.redirect('/');
})

app.post('/failure', function(req, res) {
  res.redirect('/');
})

app.post('/issues', function(req, res) {
  res.write('<h1>Thank you for your participations of the solving this problem</h1>');
  res.write('<p><a href="/">Click here</a> to get back to our homepage.');
  res.send();
})

//List ID
// 0d52153518

//API key
// c4715e618051482d131823af8761d0ad-us4

app.listen(process.env.PORT || 3000, function() {
  console.log('Server is running on port 3000');
})
