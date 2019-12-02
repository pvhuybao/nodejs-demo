const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRouter');


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

const adminRouter = express.Router();

function router(nav) {
    adminRouter.route('/').get((req, res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const response = await db.collection('books').insertMany(books);
                res.json(response);
            } catch (err) {
                debug(err.stack);
            };

            client.close();
        }());
    });

    return adminRouter;
}

module.exports = router;