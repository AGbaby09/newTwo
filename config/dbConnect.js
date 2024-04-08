import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(process.env.DB_URI);
        console.log("DB Connected: ", connected.connection.host);
    } catch (error) {
        console.log("DB Not Connected: ", error.message);
        process.exit(1);
    }
};

export default dbConnect;
