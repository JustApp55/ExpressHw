require('dotenv').config()
const express = require('express'); //from documentation: express is function
const app = express();//app is an object
const port = process.env.PORT;

console.log(process.env.PORT);


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
      .replace('#image#', '<img src=' + options.image + '>' )
    return callback(null, rendered)
  });
});
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engin


app.get('/greeting/:name', (req, res) => {
    res.render('template', {title: 'Greeting', message: 'What\'s up, stranger!', content: 'Welcome ' + req.params.name + ', it\'s so great to see you!'});
 });
 
  app.get('/tip/:total/:tipPercentage' , (req, res)=>{
   res.render('template',{title: 'Tip', message: 'Please, your tip is:', content: '$' + Math.round((req.params.total*(req.params.tipPercentage * 0.01)))})
})

const magic8Ball = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]

app.get('/magic/:question', (req,res) => {
  const response = magic8Ball[Math.floor(Math.random()*magic8Ball.length)]
  res.render('template', {message: req.params.question, content: '<h1>' + 'Your question was: ' + response + '</h1>' })
})


app.listen(3000, () => {
    console.log('listening');
});