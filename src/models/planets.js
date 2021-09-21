const mongoose=require('mongoose');
const {Schema}=mongoose;

const planetSchema=new Schema({
	name: String,
	weight: Number,
	manufacturer: String,
	yearConstruction: Number
});

module.exports=mongoose.model('planets',planetSchema);
