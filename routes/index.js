var express = require('express');
const { route } = require('../app');
var router = express.Router();
const Book = require("../models").Book;//usually singular 



/* GET home page. */

router.get("/", (req, res, next) => {
  res.redirect("/books");
});

//shows full list of books
router.get("/books", async function (req, res, next) {
  const books = await Book.findAll();
  res.json(books);
});

// get /books/new - Shows the create new book form
router.get('/books/new', (req,res) => {
  res.render('new-book',{book: Book.build(), title: 'New Book'})
});

// post /books/new - Posts a new book to the database
router.post('/books/new', (async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      article = await Book.build(req.body);
      res.render('new-book', { book, errors, title: 'New Book' })
    } else {
      throw error;
    }  
  }
}));


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
router.post(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    let books;
    try {
      books = await Book.findByPk(req.params.id);
      if (article) {
        await Book.update(req.body);
        res.redirect("/book/" + book.id);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        books = await Book.build(req.body);
        book.id = req.params.id;
        res.render("articles/edit", {
          book,
          errors: error.errors,
          title: "Update Book Information",
        });
      } else {
        throw error;
      }
    }
  })
);

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
router.post(
  "/book:id/delete",
  asyncHandler(async (req, res) => {
    const books = await Book.findByPk(req.params.id);
    if (book) {
      await article.destroy();
      res.redirect("/book");
    } else {
      res.sendStatus(404);
    }
  })
);



module.exports = router;
