if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');

const app = express();
const expresslayouts = require('express-ejs-layouts');
const goose = require('mongoose');
const indexController = require('./controllers/index');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');
app.use(expresslayouts);
app.use(express.static('public'));

goose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const database = goose.connection;
database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexController);

app.listen(process.env.port || 5000);
