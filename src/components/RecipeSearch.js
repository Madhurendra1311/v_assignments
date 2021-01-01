// import React, { useState, useEffect } from 'react'
// import axios from 'axios';

// const apiKey = '0f5e1752bfaf4ba7b41aab949b2e0893'

// export default function RecipeInfo(props) {
//     const [ searchRecipe, setSearchRecipe] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         setIsLoading(true)
//         axios 
//             .get(`https://api.spoonacular.com/recipes/complexSearch?query=${props.match.params.query}&apiKey=${apiKey}`)
//             .then(res=>{
//                 setSearchRecipe(res.data.results)
//                 setIsLoading(false)
//             })
//             .catch(err=>console.log(err))
//     }, [props.match.params.query])

//     console.log(searchRecipe, isLoading);

//     return (
//         <div>
            
//         </div>
//     )
// }
