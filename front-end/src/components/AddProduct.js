import React ,{useState} from 'react'
const AddProduct =()=>{
    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [company,setCompany] = useState("")
    const addProduct = async()=>{
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5000/add-product",{
            method:'post',
            body: JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json();

    }
    return(
         <div className='add_product'>
           <h1> Add Product </h1>
           <input type="text" placeholder='Enter Product Name'  onChange={(e)=>{setName(e.target.value)}}></input>
           <input type="text" placeholder='Enter Product Price' onChange={(e)=>{setPrice(e.target.value)}}></input>
           <input type="text" placeholder='Enter Product Category' onChange={(e)=>{setCategory(e.target.value)}}></input>
           <input type="text" placeholder='Enter Product Company' onChange={(e)=>{setCompany(e.target.value)}}></input>
           <button onClick={addProduct} className='add-button'> Add Product</button>
         </div>
    )
}
export default AddProduct;