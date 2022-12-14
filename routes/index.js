var express = require('express');
const { route } = require('../app');
var router = express.Router();
const Book = require("../models").Book;//usually singular 

/* GET home page. */

router.get("/", (req, res, next) => {
  res.redirect("/books");
});

//shows full list of books
router.get('/books', async function (req, res, next) {
  const books = await Book.findAll();
  res.render('index', {books});
});

// get /books/new - Shows the create new book form
router.get('/books/new', (req,res) => {
  res.render('new-book');
});


// post /books/new - Posts a new book to the database
router.post("/books/new", async (req, res) => {
  try {
    await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      res.render('new-book', { 
        errors: error.errors }); //validates both missing title & author
    } else {
      throw error;
    }  
  }
});

// get /books/:id - Shows book detail form
router.get('/books/:id', async(req, res) =>{
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render('update-book', {book,title: book.title});
    } else {
     res.render('page-not-found');
    }
});

// post /books/:id - Updates book info in the database
router.post('/books/:id', async (req, res) => {
    let book;
    try {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
            res.redirect("/books");
      } else {
        res.render('page-not-found');
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {book, errors: error.errors,
          title: "New Book"});
      } else {
        throw error;
      }
    }
  });

// post /books/:id/delete - Deletes a book.
router.post('/books/:id/delete',
  async (req, res) => {
    const book = await Book.findByPk(req.params.id);
      await book.destroy();
      res.redirect('/books');
  });

module.exports = router;


