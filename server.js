const express = require('express');
const bodyParser = require('body-parser');
const MyController = require('./controllers/MyController');

const port = 3000;
const app = express();

const myController = new MyController();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/post', myController.handlePost);
app.get('/get/:id', myController.handleGet);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});


module.exports = app;