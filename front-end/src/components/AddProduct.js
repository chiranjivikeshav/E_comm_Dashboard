import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    useEffect(() => {
        if (!name && !price && !category && !company) {
            setError(false);
        }
    }, [name, price, category, company]);


    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        if (result.status === 201) {
            setName("");
            setPrice("");
            setCategory("");
            setCompany("");
            result = await result.json();
            toast.success(result.message);
        }
        else {
            result = await result.json();
            toast.error(result.message);
        }

    }
    
    return (
        <div className='add_product'>
            <h1> Add Product </h1>
            <input type="text" placeholder='Enter Product Name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            {error && !name && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
            {error && !price && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            {error && !category && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Company' value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
            {error && !company && <span>Enter valid details</span>}
            <button onClick={addProduct} className='add-button'> Add Product</button>
        </div>
    )
}
export default AddProduct;