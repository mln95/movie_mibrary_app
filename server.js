const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const index_router = require('./Routes/index');

app.set('view engine','ejs');
app.set('views', __dirname + 'views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const data_base = require('./config/database')

app.use('/', index_router);

app.listen(process.env.PORT || 3000);
