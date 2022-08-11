var express = require('express');
var router = express.Router();
const Book = require("../models").Book;//usually singular 



/* GET home page. */
// router.get('/', async function(req, res, next) {
//  const books = await Book.findAll();
//  res.json(books)
// });


router.get('/', (req,res,next) =>{
    res.redirect('/book')
});


//     console.log ('Custom error route called');
//     const err = new Error();
//     err.message = 'Custom 500 error route thrown';
//     err.status = 500; 
//     throw err;
// if (index[req.params.id]){
//     res.render('index');
// } else {
//     const err = new Error();
//     err.status = 404;
//     err.message = `Looks like the entry you requested doesn't exist.`
//     next (err);
// }
// });

module.exports = router;
