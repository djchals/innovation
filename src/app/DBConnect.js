const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://"+process.env.DBUSER+":"+process.env.DBPASS+"@"+process.env.DBHOST+"/"+process.env.DBNAME+"?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
