var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');

var app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render(
        'index',
        {
            nav: ['Books', 'Authors'],
            title: 'Library'
        }
    );
})

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
    // debug(process);
    // console.log(`listening on port ${chalk.green('3000')}`);
})