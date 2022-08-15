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
        errors: error.errors });
    } else {
      throw error;
    }  
  }
});


// get /books/:id - Shows book detail form
router.get('/books/:id', (async(req, res) =>{
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render('update-book', {book,title: book.title});
    } else {
     res.render('page-not-found');
    }
}));

// post /books/:id - Updates book info in the database
router.post('/books/:id',(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await Book.update(req.body);
        res.redirect('/books');
      } else {
        res.render('page-not-found');
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {books, errors, 
          title: "Update Book Information",
        });
      } else {
        throw error;
      }
    }
  })
);

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
router.post('/books:id/delete',
  (async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await article.destroy();
      res.redirect('/books');
    } else {
      res.render('page-not-found');
    }
  })
);



module.exports = router;


//delete ajust book/s for redirect ,
