const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const MONGO_URI = process.env.URI

mongoose.connect(MONGO_URI)
    .then(()=> console.log("Database Connected"))
    .catch((err)=>console.log("Database connection Error"))

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:4,
        maxLength:20,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

// cereating a model from schema

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports={
    User,
    Account
};

