const express = require("express");
const path = require("path"); // ✅ You forgot to import this
const app = express();
let { v4: uuidv4 } = require('uuid');

let methodOverride = require('method-override');

 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));




const port = 8080;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// parsing the incoming request into the js object
app.use(express.urlencoded({extended: true}));

// Root route
app.get("/", (req, res) => {
    res.send("Server is working well!");
});

// Start server
app.listen(port, () => {
    console.log(`You are listening on port: ${port}`);
});

let posts=[
    {    id:uuidv4(),
        username:"deepak_kumar_kushwaha",
        content:"seeing the adult pictures and content and commenting inside the beautiful girl posts"
    },
    {    id:uuidv4(),
        username:"stayam_sahu",
        content:"seeing the adult pictures and content  searching and commenting inside the beautiful girl posts"
    },
    {     id:uuidv4(),
        username:"monu_chauhan",
        content:"seeing the adult pictures , and bachodi and content and commenting inside the beautiful girl posts"
    },
    {    id:uuidv4(),
        username:"atul_kumar",
        content:"seeing the adult pictures and mostributing ofter the each hot pictures of the girls"
    }

]

app.get("/posts", (req, res)=>{
    res.render("index.ejs",{posts});
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id= uuidv4();
    posts.push({ id, username,content});
    res.redirect("/posts")
})
app.get("/posts/new" , (req ,res)=>{
    res.render("new.ejs");
});

//******************************* uuid ********************************/

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let postid = posts.find((p) => p.id === id);
    if (!postid) {
        return res.status(404).send("❌ Post not found!");
    }

    res.render("show.ejs", { postid });
});
//***************************** patch (update a part) **************************************/
// app.patch("/posts/:id",(req , res)=>{
//     let {content}=req.body.content;
//     let { id } = req.params;
//     id.content=content;
//     res.redirect("/posts");


// });

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { content } = req.body;

    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("❌ Post not found!");
    }

    post.content = content;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req ,res)=>{
let { id } = req.params;
    let postid = posts.find((p) => p.id === id);
    if (!postid) {
        return res.status(404).send("❌ Post not found!");
    }

    res.render("edit.ejs", { postid });

});
//************************************************** delete the routs(posts) *****************/

app.delete("/posts/:id" , (req,res)=>{
    let {id}=req.params;
  posts= posts.filter((p) => p.id !== id);
   res.redirect("/posts");
    
})