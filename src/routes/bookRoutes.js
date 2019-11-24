var express = require('express');

const bookRouter = express.Router();

function router(nav) {
    const books = [
        {
            title: 'Book 1',
            genre: 'History',
            author: 'Bao',
            read: false
        },
        {
            title: 'Book 2',
            genre: 'Drama',
            author: 'Huy',
            read: false
        },
        {
            title: 'Book 3',
            genre: 'Horror',
            author: 'Phan',
            read: false
        }
    ];

    bookRouter.route('/:id').get((req, res) => {
        const { id } = req.params; // same as id = req.params.id
        res.render(
            'bookView',
            {
                nav,
                title: 'Library',
                book: books[id]
            }
        );
    });

    bookRouter.route('/').get((req, res) => {
        res.render(
            'bookListView',
            {
                nav,
                title: 'Library',
                books
            }
        );
    });

    return bookRouter;
}


module.exports = router;