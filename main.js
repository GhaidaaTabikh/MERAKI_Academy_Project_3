const express = require("express")
const app = express()
const port = 5000

// getAllArticles ticket
const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

const getAllArticles = (req,res,next)=>{
    res.status(200)
    res.json(articles)
    next()
}

app.get("/articles",getAllArticles)

//getArticlesByAuthor ticket

app.listen(port,()=>{
    console.log("hi in project 3");
})