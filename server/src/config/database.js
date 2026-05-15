const { default: mongoose } = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected successfully");
        
    } catch (error) {
        console.log("Error in connecting DB",error);
    }
}

module.exports = connectDB