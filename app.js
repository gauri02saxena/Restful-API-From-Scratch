const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/wikiDB");

const articleSchema={
    title: String,
    content:String
}

const Article= mongoose.model("Article", articleSchema);


//To prevent writing the same route again and again
app.route("/articles")
.get(function(req,res)
{
    Article.find({})
    .then((foundItems)=> {res.send(foundItems)})
    .catch((err)=>console.log(err));
})
.post(function(req,res)
{


    const newArticle= new Article({
        title: req.body.title,
        content:req.body.content
    });

    newArticle.save()
    .then(()=>{res.send("Succesfully saved to DB!")})
    .catch((err)=>{res.send(err)});
})
.delete(function(req,res)
{
    Article.deleteMany()
    .then(()=>res.send("Successfully deleted all articles from DB!"))
    .catch((err)=>res.send(err));
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});
