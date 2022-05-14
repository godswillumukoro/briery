if (process.env.NODE_DEV !== 'production') {
  require('dotenv').config();
}
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const indexController = require('./controllers/index');
const authorController = require('./controllers/authors');

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;
database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connected to Mongoose'));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/', indexController);
app.use('/authors', authorController);

app.listen(process.env.PORT);
