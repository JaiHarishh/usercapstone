const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const collections = require('./config');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render("login");
})


app.get("/signup",(req,res)=>{
  res.render("signup");
})

app.post("/signup", async (req, res)=>{
  const data = {
    name: req.body.username,
    password: req.body.password
  }

  const existingUser = await collections.findOne({name: data.name});
  if(existingUser){
    res.send("User already exists. Please use different username");
  }
else{
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  const userdata = await collections.insertMany(data);
  console.log(userdata);
}
});


app.post("/login",async (req,res)=>{
  try{
    const check = await collections.findOne({name:req.body.username});
    if(!check){
      res.send("User not registered");
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch){
      res.render("home");
    }else{
      req.send("wrong password");
    }

  }
  catch{
    res.send("wrong details");
  }
})


const port = 5000;
app.listen(port,() => {
  console.log(`Server is running on port ${port}`);
})