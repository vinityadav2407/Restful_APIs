const express = require("express");
const path = require("path"); // ✅ You forgot to import this
let { v4: uuidv4 } = require('uuid');


const app = express();
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
