const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema =  new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required  : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    urn : {
        type : Number,
        required  : true,
        unique : true
    },
    location : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    }

});

userSchema.statics.login = async function(email, urn, password)
{
    if(!email || !password || !urn)
    {
        throw Error('All fields must be filed')
    }
    if(!validator.isEmail(email))
    {
        throw Error('Invalid Email')
    }
    const user = await this.findOne({email})
    if(!user)
    {
        throw Error("User does not exist")
    }
    if(user.urn!=urn)
    {
        throw Error("Invalid login credentials")
    }
    const match = await bcrypt.compare(password,user.password);

    if(!match)
    {
        throw Error("Invalid login credentials")
    }

    return user
    

}
//a static method for validations and hashing of passwords
// don't use signup() - gives error
userSchema.statics.signup = async function(name, email, phone, urn, password, role, location){

    //see whether the email has a valid value 
    
    if(!validator.isEmail(email))
    {
        throw Error('Invalid Email')
    }

    if(!validator.isStrongPassword(password))
    {
        throw Error('Password not strong')
    }
//we use this keyword to refer to the current Model, if email already exists, then don't signup
    const exists = await this.findOne({email})
    if(exists)
    {
        throw Error("Email already exists")
    }

//save user to database 
//For hashing 
// install package bcrypt - hashes passwords in a secure 
// gives time to let users know 
// use - salt - random string of characters added to password before hashing
// longer number - more signup time 

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({
        email : email, password : hash, phone:phone, urn : urn, role : role, name : name, location:location
    });
    return user;


}
module.exports = mongoose.model('User',userSchema,'users')
