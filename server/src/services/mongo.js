const mongoose=require('mongoose');

const MONGO_URL="mongodb+srv://nikita:MAQhg92lmQdNp7Wv@hospitalmanagement.mixf3ab.mongodb.net/hospital?retryWrites=true&w=majority";

mongoose.connection.once('open',()=>{
    console.log("MongoDB connecion ready!");
});

mongoose.connection.on('error',(error)=>{
    console.ero(error);
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports={
    mongoConnect,
    mongoDisconnect
}