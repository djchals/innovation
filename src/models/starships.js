const mongoose=require('mongoose');
const {Schema}=mongoose;

const starshipSchema=new Schema({
	name: String,
	weight: Number,
	manufacturer: String,
	yearConstruction: Number
});

module.exports=mongoose.model('starships',starshipSchema);
