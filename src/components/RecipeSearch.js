import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const apiKey = '0f5e1752bfaf4ba7b41aab949b2e0893'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 900,
        marginLeft: 210,
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

export default function RecipeInfo(props) {
    const classes = useStyles();
    const [ searchRecipe, setSearchRecipe] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        axios 
            .get(`https://api.spoonacular.com/recipes/complexSearch?query=${props.match.params.query}&apiKey=${apiKey}`)
            .then(res=>{
                setSearchRecipe(res.data.results)
                setIsLoading(false)
            })
            .catch(err=>console.log(err))
    }, [props.match.params.query])

    const menuId = 'primary-search-account-menu';

    console.log(searchRecipe, isLoading);

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
                <div>
                {
                    isLoading ?
                        <div>loading...</div>
                        :
                        <div>
                            {
                                searchRecipe && searchRecipe.map(item=> {
                                    return(
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
                                            </CardContent>
                                            </CardActionArea>
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
