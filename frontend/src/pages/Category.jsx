import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubCategories } from "../api/api";

function Category() {

    const { categoryId } = useParams()

    const [subcategories,setsubcategories] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")

    useEffect(()=>{
        const fetchSubcategories = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await getSubCategories(categoryId)
                setsubcategories(response.data.subcategories || []) 

            } catch (error) {
                console.log(error)
                setError("Unable to loa subcategories")
            }finally{
                setLoading(false)
            }
        }
        fetchSubcategories()
    },[])
  return (
    <div className='category-name'>
        <h1>Explore Categories</h1>

        {loading
        ?(<p>Loading subcategories...</p>)
        :error
        ?(<p>{error}</p>)
        :subcategories.length === 0 
        ?(<p>No subcategories available</p>)
        :(
            <div className='subcategory-grid'>
                {subcategories.map((category) => (
                <Link to={`/category/${category._id}/products`}
                  className="subcategory-card"
                    key={category._id}>
                    <div className="subcategory-image">
                     {category.image 
                     ?(<img src={category.image}alt={category.name}/>) 
                     :(<span>{category.name.charAt(0)}</span>
                    )}
                 </div>
                <h3>{category.name}</h3>
            </Link>
            ))}
        </div>
        )}
    </div>
)}

export default Category
