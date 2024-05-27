import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Avatar, Backdrop, Button, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Container, IconButton, IconButtonProps, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, makeStyles, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import projects from '../photos/projects.jpg'

import { red } from '@mui/material/colors';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
   
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Portfolio(props: any) {
        const [expand, setExpand] = useState<boolean>(false)
        const [expandedGD, setExpandedGD] = React.useState(false);
        const [expandedApp, setExpandedApp] = React.useState(false);
        const [expandedSD, setExpandedSD] = React.useState(false);
        const [expandedAppSem, setExpandedAppSem] = React.useState(false);
        const [expandedGame, setExpandGame] = useState<boolean>(false)
        const [expandedSome, setExpandSome] = useState<boolean>(false)

        const handleExpandClick = (values : string) => {
            if (values === "GD"){
                setExpandedGD(!expandedGD);
            }
            if (values === "App"){
                setExpandedApp(!expandedApp);
            }
            if (values === "SD"){
                setExpandedSD(!expandedSD);
            }
            if (values === "AppSem"){
                setExpandedAppSem(!expandedAppSem);
            }
            if (values === "game"){
                setExpandGame(!expandedGame);
            }
            if (values === "some"){
                setExpandSome(!expandedSome);
            }
        };
    
        useEffect(() => {

            if (props.headLiner === "My portfolio") {//headliner

            } else {
                props.setHeadliner("My portfolio")
                localStorage.setItem("last_path", "/Portfolio")
            }
        }, [])
        
        return (<>
            <Container className='Portfolioontainer'>
                <Paper elevation={0} className='portfolioPaper'>
                    <Card  className='portfolioCard'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    G
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Grapical desing course work"
                            subheader="Year 2023"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                I have made a new version website based on old version. I have planned Here
                                color palettes and views.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedGD}
                                onClick={()=> handleExpandClick("GD")}
                                aria-expanded={expand}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedGD} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                    <Card  className='portfolioCard'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    App
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Application programming"
                            subheader="Year 2024"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                I make this project with React native. It uses api calls, gps and camera in phone
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedApp}
                                onClick={()=> handleExpandClick("App")}
                                aria-expanded={expand}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedApp} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Paper>
                
                <Paper elevation={0} className='portfolioPaper'> 
                <Card  className='portfolioCard'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    S
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Service desing course work"
                            subheader="Year 2024"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                I made this application view based on service desin courses team work.
                                
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedSD}
                                onClick={()=>handleExpandClick("SD")}
                                aria-expanded={expand}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedSD} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                    <Card  className='portfolioCard'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    App
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Application programming last semester"
                            subheader="Year 2023"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This application search post marks from database and print out with a picture to
                                web site. 
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedAppSem}
                                onClick={()=>handleExpandClick("AppSem")}
                                aria-expanded={expand}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedAppSem} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Paper>

                <Paper elevation={0} className='portfolioPaper'> 
                <Card  className='portfolioCard'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    S
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Gaming course work"
                            subheader="Year 2024"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                I make this game with Unreal engine 5.23. Only graphical side                                
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedGame}
                                onClick={()=>handleExpandClick("game")}
                                aria-expanded={expand}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedGame} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                    <Card  className='portfolioCard'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    App
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Figure out this later"
                            subheader="Year 2023"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                figure out the subject to this card
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedSome}
                                onClick={()=>handleExpandClick("some")}
                                aria-expanded={expand}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedSome} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <CardMedia
                            component="img"
                            height="194"
                            image={projects}
                            alt="Paella dish"
                        />
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Paper>

            </Container></>)
    }

    export default Portfolio;