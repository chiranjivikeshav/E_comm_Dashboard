import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const UpdateProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    const params = useParams();

    useEffect(() => {
        getProduct();
    }, [params.id]); // Adding params.id as a dependency to ensure it runs only when id changes

    const getProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-type': "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
    }
    return (
        <div className='add_product'>
            <h1> Update Product </h1>
            <input type="text" placeholder='Enter Product Name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            {error && !name && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
            {error && !price && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            {error && !category && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Company' value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
            {error && !company && <span>Enter valid details</span>}
            <button onClick={updateProduct} className='add-button'> Update Product</button>
        </div>
    )
}
export default UpdateProduct
