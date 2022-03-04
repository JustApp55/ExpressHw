require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT

/*
- On the home page (`get "/"`), users should see:
  - "99 Bottles of beer on the wall"
  - a link that says "take one down, pass it around"
  - this should link to `/98`, where the number represents the number of bottles left.
- When a number is given in the url (`get "/:number_of_bottles"`), users should see:
  - The number of bottles of beer on the wall (i.e. `98 Bottles of beer on the wall.`)
  - a link to "take one down, pass it around", where the href is number of bottles in the parameter minus 1.
- If there are 0 bottles left, do not show a link to "take one down"
  - Add a link to start over, which directs the user back to the home page.
*/

app.get('/', (req, res) => {
    res.send('template', {message: '99 bottles of beer on the wall', content:" '<a href=/98>'take one down, pass it around'</a>'"})
})

app.get('/0', (req, res) => {
    res.send('template', {message: '0 bottles of beer on the wall', content: '<a href=/>Restart</a>'})
})

app.get('/:number_of_bottles', (req, res) => {
    let numBottles = req.params.number_of_bottles - 1
    res.send('template' , {message: req.params.number_of_bottles, content: `<a href=/ ${numBottles}>take one down, pass it around</a>`})
})



app.listen(port,() => {
    console.log('I am listening on port' , port);
}); 