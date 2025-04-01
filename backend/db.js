const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true }
);

const ConversionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
        fileName: { type: String, required: true },
        originalSize: { type: Number, required: true },
        convertedSize: { type: Number, required: true },
        xmlContent: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Conversion = mongoose.model("Conversion", ConversionSchema);

module.exports = { connectDB, User, Conversion }
