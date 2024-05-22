const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
// =============== DATA BASE INTEGRATION==============
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product")

// ========== FOR CHECKING ID FORMATE ===============
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// ================= REGISTER USER ===================
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
        return res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong!' });
    }
});


// ====================LOGIN USER ==================
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body);
        if (user) {
            user.password = undefined;
            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    return res.status(400).json({ message: 'Something went wrong' });
                }
                res.status(200).json({ message: 'Loged in successfully', user, auth: token });
            })
        }
        else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    } else {
        res.status(500).json({ message: 'Please fill the details' });
    }
})

// ==================ADD PRODUCT==================
app.post("/add-product", verifyToken, async (req, res) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        return res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

// ===============GET PRODUCT LIST==================
app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find();
    res.send(products);
})

// ==============DELETE PRODUCT FROM LIST=============
app.delete("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "Product deleted successfully" });
})

// ==============GET SINGLE PRODUCT FOR UPDATION =========
app.get("/product/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID format" });
    }
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: "Record Not Found" });
    }
})

// ================ UPDATE PRODUCT ===================
app.put("/product/:id", verifyToken, async (req, res) => {
    try {
        let result = await Product.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        return res.status(200).json({ message: "Product Details Updated" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

// ==================SEARCH PRODUCTS ===================
app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

// =================JWT TOKEN VERIFYCATION =============
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ message: "Please provide valid token" })
            } else {
                next();
            }
        })

    } else {
        res.status(403).send({ message: "Please add token.." })
    }
}

app.listen(5000);