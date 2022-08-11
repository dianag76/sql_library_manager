var express = require('express');
var router = express.Router();
const Book = require("../models").Book;//usually singular 



/* GET home page. */
router.get('/', async function(req, res, next) {
 const books = await Book.findAll();
 res.json(books)
});


module.exports = router;
