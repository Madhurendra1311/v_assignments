import React, { useState, useEffect } from 'react'
import data from './data.json'
// import axios from 'axios';

// const apiKey = '0f5e1752bfaf4ba7b41aab949b2e0893'

export default function RecipeInfo(props) {
    const [ detailedRecipe, setDetailedRecipe] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        // axios 
        //     .get(`https://api.spoonacular.com/recipes/${props.match.params.id}/information?includeNutrition=false&apiKey=${apiKey}`)
        //     .then(res=>{
        //         setDetailedRecipe(res.data)
        //         setIsLoading(false)
        //     })
        //     .catch(err=>console.log(err))
    setDetailedRecipe(data.filter(a=> a.id === Number(props.match.params.id))[0])
    setIsLoading(false)
    }, [props.match.params.id])

    console.log(isLoading ? 'Loading': detailedRecipe);

    return (
        <div>
            
        </div>
    )
}
