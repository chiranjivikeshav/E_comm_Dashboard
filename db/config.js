const mongoose = require("mongoose");
// email used for atlas chiranjivikeshav210@gmail.com
// Ensure any special characters in the password are URL encoded
require('dotenv').config();

const dbUser = process.env.DATABASE_USERNAME;
const dbPassword = encodeURIComponent(process.env.DATABASE_PASSWORD);
const dbName = process.env.DATABASE_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wogxav8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {
//   console.log('MongoDB Atlas connected successfully.');
})
.catch((err) => {
//   console.error('MongoDB Atlas connection error:', err);
});
