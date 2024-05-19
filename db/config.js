const mongoose = require("mongoose");
// email used for atlas chiranjivikeshav210@gmail.com
// Ensure any special characters in the password are URL encoded
const dbUser = 'chiranjivikeshav';
const dbPassword = encodeURIComponent('Ckeshav@123');
const dbName = 'e-commerce';

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wogxav8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {
//   console.log('MongoDB Atlas connected successfully.');
})
.catch((err) => {
//   console.error('MongoDB Atlas connection error:', err);
});
