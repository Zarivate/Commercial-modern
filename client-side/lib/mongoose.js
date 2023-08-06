import mongoose from "mongoose";

export function mongooseConnect() {
  // Check if there is a mongoose connection or not
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    // If there is no already connection established then just create a new one
    return mongoose.connect(uri);
  }
}
