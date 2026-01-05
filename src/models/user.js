const {Schema, mongoose} = require("mongoose");

const userSchema = new Schema({
    firstName: {type : String,
        required: true,
        minLength: 10,
        maxLength: 50,
        trim: true,
    },
    lastName: {type : String,
        minLength: 10,
        maxLength: 50,
        trim: true,
    },
    email: {type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            // here we should validate whether the email is valid or not
        }
    },
    password: {type : String,
        required: true,
        // we should check whether the password is strong or not
    },
    age : {type: Number,
        min: 18,
    },
    gender: {type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("gender type not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "",
        // should be a valid url
    },
    about: {
        type: String,
        default: "This is the default description of the user",
        maxLength: 1000,
    },
    skills: {
        type: [String],
    },
},
{
    timestamps : true,
});

const User = new mongoose.model("User", userSchema);


module.exports = {
    User
}