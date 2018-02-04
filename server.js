const express = require('express')
const app = express();
const db = require('./db');
const Users = db.models.Users;
const nunjucks = require('nunjucks');
nunjucks.configure({noCache:true})
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded())
const path = require('path');



app.set('view engine', 'html');
app.engine('html', nunjucks.render)

app.use('/vendor', express.static(path.join(__dirname,'node_modules')));
app.use((req, res, next)=>{
    res.locals.path = req.url;
    next();
});
app.use('/users', require('./routes/users'))


app.get('/', (req, res, next)=>{
    res.render('index', {title: 'Home'})
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening at ${port}`))

db.sync()
    .then(()=>db.seed())