const express = require("express")
const app = express()
const port = 5000

const articlesRouter=express.Router()


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

articlesRouter.get("",getAllArticles)

//getArticlesByAuthor ticket

const getArticlesByAuthor = (req,res)=>{
    res.json(articles.filter((element,index)=>{
        const t = req.query.author
        return element.author.toLowerCase()===t.toLowerCase()
    }))
}

articlesRouter.get("/search_1",getArticlesByAuthor)


app.use("/articles",articlesRouter)

app.listen(port,()=>{
    console.log("hi in project 3");
})