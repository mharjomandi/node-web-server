//https://www.npmjs.com/package/hbs

const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// register middle ware to do authentication
app.use((req, res, next) => {
  var now = new Date().toString();
  var dt =  new Date().toISOString().slice(0,10);
  var log= `${now}: ${req.method} ${req.url}`;
  console.log (log);
  fs.appendFile(`server-${dt}.log`, log + `\n`, (err) => {
    if (err) {
      console.log (`Unable to append to <server-${dt}.log>`);
    }
  })
  next();
});

// check maintenance
// app.use((req, res, next) => {
//   res.render (`maintenance.hbs`);
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>مرحبا');
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello there'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'My About'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log ('Server is up on port 3000')
});
