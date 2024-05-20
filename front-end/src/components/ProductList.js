import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/Products');
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct= async(id)=>{
       let result  = await fetch(`http://localhost:5000/product/${id}`,{
          method :"Delete"
       })
       result  = await result.json();
       if(result){
        getProducts();
       }
    }

    return (
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
            products.map((item,index)=>
            <ul className="product-item">
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <Link to={"/update/"+item._id}>Update</Link>
                </li>
            </ul>
            )}   
        </div>
    )
}
export default ProductList;
