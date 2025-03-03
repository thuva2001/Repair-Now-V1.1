import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema

const bookSchema =  mongoose.Schema({
    CustomerName: {
        required: true,
        type: String
    },
    Location: {
        required: true,
        type: String
    },

    ContactNumber: {
        required: true,
        type: Number
    },

    VehicleType: {
        required: true,
        type: String
    },

    Problem: {
        required: true,
        type: String
    },

    MechanicId:{
        type: ObjectId,
        ref: "mechanic",
        required:  true
    }

},
{
    timestamps: true,
    type: Date,
    default: Date.now
   
})


const Book = mongoose.model('book', bookSchema);
export default Book;