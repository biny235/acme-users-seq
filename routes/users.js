const app = require('express').Router();
const db = require('../db');
const { models } = db;
const { Users } = models;

module.exports = app;

app.get('/', (req, res, next)=>{
    Users.findAll()
        .then(users => res.render('users', {title: 'Users', users}))
        .catch(err => next(err))
});
app.get('/:id', (req, res, next)=>{
    Users.findById(req.params.id)
        .then(user => res.render('user', {title: `${user.name}'s page`, user}))
        .catch(err => next(err))
});

app.delete('/:id', (req, res, next)=>{
    Users.findById(req.params.id)
        .then(user => user.destroy())
        .then(()=> res.redirect('/users'))
        .catch(err => next(err))
});

app.post('/', (req, res, next)=>{
    Users.create({ name: req.body.name })
        .then(()=>{
            res.redirect('/users')
        })
        .catch(err => next(err))
})

app.patch('/:id', (req, res, next)=>{
    Users.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            return user.save();
         })
        .then(()=> res.redirect('/users'))
        .catch(err => next(err))
        
});