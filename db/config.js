// using mongoose 
const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://arun:kumar@cluster0.wnown.mongodb.net/ETdb?retryWrites=true&w=majority";

const client = mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to DB");
  }
);
