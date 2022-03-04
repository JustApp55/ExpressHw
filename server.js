const express = require('express');
const app = express();

// app.get('/greeting', (req, res) => {
//     res.send('Hello, stranger');
// });

const fs = require('fs') // this engine requires the fs module like we did monday
const res = require('express/lib/response')
const req = require('express/lib/request')
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>')
      .replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  });
});
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engin


app.get('/greeting/:name', (req, res) => {
    res.render('template', {title: 'Greeting', message: 'What\'s up, stranger!', content: 'Welcome ' + req.params.name + ', it\'s so great to see you!'});
 });
 
 app.get('/tip/:total/:tipPercentage', (req, res) => {
    res.render('template', { title: 'Tip', message: (req.params.total) * (req.params.tipPercentage)/100 })
  })

 // (math.random()*20+1)


app.listen(3000, () => {
    console.log('listening');
});