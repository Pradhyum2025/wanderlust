//require mongoose package
const mongoose=require("mongoose");

const initData =require("./data.js");
const Listing=require("../models/listing.js")

main()
.then(()=>{console.log("mongoose is responsing...")})
.catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async()=>{
    initData.data=initData.data.map((obj)=>({...obj, owner:"66b3ec28d93923f01fe2ca94",category:['mountain']}));
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();