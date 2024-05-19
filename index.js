const express  = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product")

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({
            $or: [{ email: email }, { name: name }]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let user = new User({ name, email, password });
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong!' });
    }
});



app.post("/login",async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body);
        if(user){
            user.password = undefined;
            res.status(200).json({ message: 'Loged in successfully',user});
        }
        else{
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    } else{
        res.status(500).json({ message: 'Please fill the details' });
    }
})

app.post("/add-product",async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})



app.listen(5000);