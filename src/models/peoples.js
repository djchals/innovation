const mongoose=require('mongoose');
const {Schema}=mongoose;

const peopleSchema=new Schema({
	name: String,
	age: Number,
	height: Number,
	eyeColor: String
});

module.exports=mongoose.model('peoples',peopleSchema);
