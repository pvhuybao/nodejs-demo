var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    debug('my middleware');
    next();
})

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
    {
        link: '/books',
        title: 'Book'
    },
    {
        link: '/authors',
        title: 'Author'
    }
];

// const bookRouter = require('./src/routes/bookRoutes')(nav);
let bookRouter = require('./src/routes/bookRoutes');
bookRouter = bookRouter(nav);
let adminRouter = require('./src/routes/adminRoutes')(nav);
let authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render(
        'index',
        {
            nav: [
                {
                    link: '/books',
                    title: 'Books'
                },
                {
                    link: '/authors',
                    title: 'Authors'
                }
            ],
            title: 'Library'
        }
    );
})

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
    // debug(process);
    // console.log(`listening on port ${chalk.green('3000')}`);
})