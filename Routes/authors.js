const express = require('express');
const router = express.Router();
const Author = require('../models/authors_form')

router.get('/', async (req, res, next) =>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    } else{
        console.log('no parameters')
    }
    try{
        console.log(searchOptions);
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res, next) =>{
    res.render('authors/new');
})

router.post('/', async (req, res, next)=>{
    const author = new Author({
        name: req.body.name,
    })
    try{
        const newAuthor = await author.save().then(() => {
        console.log('data collected');
        res.redirect('/authors')
        })
    }catch {
        res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
        })
    }
        // author.save((err, newAuthor) => {
    //     if(err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'error'
    //         })
    //     } else {
    //         res.redirect(`/authors/${newAuthor.id}`)
    //     }
    // })
})


module.exports = router;