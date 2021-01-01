import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
// import axios from 'axios'
import data from './data.json'
import {Link, useHistory} from 'react-router-dom'

// const endPoints = 'https://api.spoonacular.com/recipes/informationBulk'
// const apiKey = '0f5e1752bfaf4ba7b41aab949b2e0893'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


export default function Recipes() {
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();
    const [showData, setShowData] = useState([])
    const handleChange = (event, value) => {
        setPage(value);
    };
    const [recipesData, setRecipesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState()

    useEffect(() => {
        let recipeData = [...data]
        setIsLoading(true)
        setRecipesData(recipeData)
        setTotalPage(Math.ceil(recipeData.length/5))
        setShowData(recipeData.slice((page-1)*5,page*5))
        setIsLoading(false)

        // let startId = 716429
        // let ids = []
        // for(let i = 0; i < 35; i++){
        //     ids.push(startId+i)
        // }
        // axios 
        //     .get(`${endPoints}?ids=${ids.join(',')}&apiKey=${apiKey}`)
        //     .then(res=>{
        //          let recipeData = [...res.data]
        //          setRecipesData(recipeData)
        //          setTotalPage(Math.ceil(recipeData.length/5))
        //          setShowData(recipeData.slice((page-1)*5,page*5))
        //          setIsLoading(false)
        //     })
        //     .catch(err=>console.log(err))
    }, [page])

   const handleSearch = () =>{
        console.log(query);
        history.push(`/recipeSearch/${query}`)
    }

    

    console.log(isLoading ? 'Loading': recipesData);
    return (
        <>
            <div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Search the name"
                        onChange={(e)=> setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {
                    showData && showData.map(item => {
                        return(
                            <div>
                                <div>
                                    <h5>{item.title}</h5>
                                </div>,
                                <div>
                                    <p>{item.summary}</p>
                                </div>
                                <img alt="" src={item.image} style={{width:"100px",height:"100px"}} /><br/>,
                                <div>
                                    <Link to={`/recipeInfo/${item.id}`}><button>RecipeInfo</button></Link>
                                </div>
                            </div>  
                        )
                    })
                }
            </div>
            <div className={classes.root}>
                <Typography>Page: {page}</Typography>
                <Pagination count={totalPage} page={page} onChange={handleChange} />
            </div>
      </>
    )
}
