const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine','hbs');

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.use((req,res,next)=>{
    res.send('Work in progress!');
})
app.use(express.static(`${__dirname}/public`))

app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}, ${req.method}, ${req.url} \n`;
    fs.appendFile(`server.log`,log,(err)=>{
        if(err){
            console.log(err);
        }
    })
    next();
})

const port = process.env.port || 3000;
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        name: 'Samson',
        pageTitle: 'Home page'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Bad request'
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});



