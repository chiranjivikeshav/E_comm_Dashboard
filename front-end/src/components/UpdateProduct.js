import React ,{useEffect,useState} from 'react'

const UpdateProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)

    const updateProduct = async () => {

    }

    return (
        <div className='add_product'>
            <h1> Update Product </h1>
            <input type="text" placeholder='Enter Product Name' onChange={(e) => { setName(e.target.value) }}></input>
            {error && !name && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Price' onChange={(e) => { setPrice(e.target.value) }}></input>
            {error && !price && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Category' onChange={(e) => { setCategory(e.target.value) }}></input>
            {error && !category && <span>Enter valid details</span>}
            <input type="text" placeholder='Enter Product Company' onChange={(e) => { setCompany(e.target.value) }}></input>
            {error && !company && <span>Enter valid details</span>}
            <button onClick={updateProduct} className='add-button'> Update Product</button>
        </div>
    )
}
export default UpdateProduct
