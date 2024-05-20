const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://crudops:crudops@cluster0.r5gwhul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


connect.then(()=>{
  console.log("Database connected");
})
.catch(()=>{
  console.log("Error");
});


const LoginSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})


const collections = new mongoose.model("loginusers", LoginSchema);

module.exports = collections;