var express = require('express');
var router = express.Router();
const Book = require("../models").Book;



/* GET home page. */
router.get('/', function(req, res, next) {
 const book = await Book.findAll();
 res.json({books, title:"Books"})
});


module.exports = router;
