import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import data from './data.json'
import {Link, useHistory} from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


// const endPoints = 'https://api.spoonacular.com/recipes/informationBulk'
// const apiKey = '0f5e1752bfaf4ba7b41aab949b2e0893'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 900,
        marginLeft: 210,
        // height:350,
    },
    media: {
        height: 100,
        width: 100,
        justifyContent: "center",
        borderRadius: "100%",
        marginLeft: '390px'
    },
    root1: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
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

    const menuId = 'primary-search-account-menu';
    

    console.log(isLoading ? 'Loading': recipesData);
    return (
        <>
            <div>
                <>
                    <div className={classes.grow}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Recipe-Information
                                </Typography>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        type="text"
                                        name="name"
                                        placeholder="Search Recipe…"
                                        onChange={(e) => setQuery(e.target.value)}
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <Button variant="contained" color="secondary" disableElevation onClick={handleSearch}>Search</Button>
                                <div className={classes.grow} />
                                <div className={classes.sectionDesktop}>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                </><br/>
                <div className={classes.root1} style={{marginLeft:"450px"}}>
                    <Pagination count={totalPage} page={page} onChange={handleChange} />
                </div><br/>
                <div>
                {
                    isLoading ?
                        <div>loading...</div>
                        :
                        <div>
                            {
                                showData && showData.map(item => {
                                    return (
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia className={classes.media}
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={item.image}
                                                title="Contemplative Reptile"
                                                />
                                            <CardContent>
                                            <div style={{display: "flex"}}>
                                                <div style={{paddingTop:"5px"}}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Title:
                                                    </Typography>
                                                </div>
                                                <div style={{paddingTop:"12px"}}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.title}
                                                    </Typography>
                                                </div>
                                            </div><br/>
                                            <div style={{display: "flex"}}>
                                                <div style={{paddingTop:"5px"}}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Summary:
                                                    </Typography>
                                                </div>
                                                <div style={{paddingTop:"12px"}}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.summary}
                                                    </Typography>
                                                </div>
                                            </div><br/>
                                            <div style={{display: "flex"}}>
                                                <div style={{paddingTop:"5px"}}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        ReadyInMinutes:
                                                    </Typography>
                                                </div>
                                                <div style={{paddingTop:"12px"}}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.readyInMinutes}
                                                    </Typography>
                                                </div>
                                            </div><br/>
                                            <div style={{display: "flex"}}>
                                                <div style={{paddingTop:"5px"}}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Servings:
                                                    </Typography>
                                                </div>
                                                <div style={{paddingTop:"12px"}}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.servings}
                                                    </Typography>
                                                </div>
                                            </div><br/>
                                            
                                            </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Link to={`/recipeInfo/${item.id}`}><Button variant="outlined" color="secondary">RecipeInfo</Button></Link>
                                            </CardActions>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                }
                    
                </div>
            </div>
      </>
    )
}



