const {Schema, mongoose} = require("mongoose");

const connectionRequestSchema = new Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        required: true,
        type: String,
        enum: {
            values: ["ignored", "accepted", "rejected", "interested"],
            message: "not valid status type"
        }
    },
   
},  {timestamps : true});

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});//compound indexing on from userid and touser id queries
connectionRequestSchema.index({status : 1});

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema);


module.exports = ConnectionRequestModel;
