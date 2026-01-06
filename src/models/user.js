const {Schema, mongoose} = require("mongoose");
const validator = require("validator");

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
            if(!validator.isEmail(value)) {
                throw new Error("not a valid email");
            }
        }
    },
    password: {type : String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("not a strong password");
            }
        }
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
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("not a valid photo url");
            }
        }
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