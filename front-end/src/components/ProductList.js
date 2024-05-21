import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/Products',{
           headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
           } 
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        if (result) {
            getProducts(result);
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key.length == 0) {
            getProducts();
        } else {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        }
    }



    return (


        <>

            <div className="search-container">
                <input type="text" onChange={searchHandle} placeholder="Search..." className="search-input" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M21.71,20.29l-3.4-3.39A9,9,0,1,0,17,18.39l3.4,3.4a1,1,0,0,0,1.41-1.41ZM11,18A7,7,0,1,1,18,11,7,7,0,0,1,11,18Z" />
                    </svg>
                </button>
            </div>


            <div className="product-list">
                <h3>Product List</h3>
                <ul className="product-list-header">
                    <li>S.No</li>
                    <li>Name</li>
                    <li>Price(Rs.)</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Operation</li>
                </ul>
                {
                    products.length > 0 ? products.map((item, index) =>
                        <ul className="product-item">
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id}>Update</Link>
                            </li>
                        </ul>
                    )
                        : <h3>No products found</h3>
                }
            </div>
        </>
    )
}
export default ProductList;
