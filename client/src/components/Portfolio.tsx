import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Avatar, Backdrop, Button, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Container, Dialog, DialogActions, IconButton, IconButtonProps, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, makeStyles, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CodeIcon from '@mui/icons-material/Code';
//images
import projects from '../photos/projects.jpg'
import GDeditor from '../photos/graafinen suunnittelu editori.png'
import GDDesktop from '../photos/graafinen suunnittelu selain.png'
import GDmobile from '../photos/graafinen suunnittelu puhelin.png'
import GDWireframe from '../photos/rautalankamalli.png'
import SDeditor from '../photos/serviceDesingEditor.png'
import SDdesktop from '../photos/serviceDesingDesktop.png'
import SDmobile from '../photos/serviceDesingMobile.png'
import PhoneAppCamera from '../photos/cameraApp.png'
import PhoneappStart from '../photos/startviewApp.png'
import PhoneAppForecast from '../photos/forecastApp.png'
import PhoneAppGps from '../photos/gps trackerApp.png'
import postmarkApp2 from '../photos/app autumn postmark2.png'
import postmarkApp from '../photos/app autumn postmark1.png'
import postmarkApp3 from '../photos/app autumn postmark3.png'
import postmarkApp4 from '../photos/app autumn postmark4.png'

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
    const [imageExpand, setImageexpand] = useState<string>("")
    const [expand, setExpand] = useState<boolean>(false)
    const [expandedGD, setExpandedGD] = React.useState(false);
    const [expandedApp, setExpandedApp] = React.useState(false);
    const [expandedSD, setExpandedSD] = React.useState(false);
    const [expandedAppSem, setExpandedAppSem] = React.useState(false);
    const [expandedGame, setExpandGame] = useState<boolean>(false)
    const [expandedSome, setExpandSome] = useState<boolean>(false)
    const [openImageExpand, setOpenImageExpand] = useState<boolean>(false)

    const openImageExpandDialog = (whatImage: string): void => {
        setOpenImageExpand(true)
        setImageexpand(whatImage)
    }

    const closeImageExpandDialog = (): void => {
        setOpenImageExpand(true)
    }
    const handleExpandClick = (values: string): void => {// lets choose, what card will expand
        if (values === "GD") {
            setExpandedGD(!expandedGD);
        }
        if (values === "App") {
            setExpandedApp(!expandedApp);
        }
        if (values === "SD") {
            setExpandedSD(!expandedSD);
        }
        if (values === "AppSem") {
            setExpandedAppSem(!expandedAppSem);
        }
        if (values === "game") {
            setExpandGame(!expandedGame);
        }
        if (values === "some") {
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
                <Card className='portfolioCard'>
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
                        image={GDeditor}
                        alt="Graphical desing editor"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I have made a new version website based on old version. I have planned Here
                            color palettes and views.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(GDeditor)}>
                            <ZoomInIcon />
                        </IconButton>

                        <ExpandMore
                            expand={expandedGD}
                            onClick={() => handleExpandClick("GD")}
                            aria-expanded={expand}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedGD} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Descripe:</Typography>
                            <Typography paragraph>
                                I have task in graphical desing course that make this web page outfit different way.
                                I lookout the old page and take there from logo the colorpalette what i use in my work.
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={GDDesktop}
                                alt="Graphical desing desktop view"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(GDDesktop)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Here is the desktop view what I plan. Site is looking different that orginal site.
                                nettilippu.fi was the orginal view. I use the background images and use transparency to mix images.
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={GDmobile}
                                alt="Graphical desing mobile view"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(GDmobile)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Next is the mobile view, what i have planned on tis site. I try to do mobile view simple and clear
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={GDWireframe}
                                alt="Graphical desing wireframe"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(GDWireframe)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography>
                                I also made wireframe from this work before I start desing work.This is important when you are planning
                                the user friendly webpage or app.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>

                <Card className='portfolioCard'>
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
                        image={PhoneAppCamera}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I make this project with React native. It uses api calls, gps and camera in phone. React-native is awsome tool 
                            to develope phone applications. I use the Expo device libraries.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(PhoneAppCamera)}>
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(PhoneAppCamera)}>
                            <CodeIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expandedApp}
                            onClick={() => handleExpandClick("App")}
                            aria-expanded={expand}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedApp} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>description:</Typography>
                            <Typography paragraph>
                                Upper photo tells about the camera view different screens. User can take a picture
                                and give the headline text and the description text. This application saves also location of photos.
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={PhoneappStart}
                                alt="Paella dish"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(PhoneappStart)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                This photo tells about the phone app start view where is short description about
                                application features. There is also menu component what is this applications navigation tool.
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={PhoneAppForecast}
                                alt="Paella dish"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(PhoneAppForecast)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                This photo tells about the forecast app. There user can search forecast
                                information based on user search word or phones gps coordinates. This app uses
                                a free api weather service.
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={PhoneAppGps}
                                alt="Paella dish"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(PhoneAppGps)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography>
                                This photo tells about the gps tracker application, what calculates user excercise
                                length based on gps coordinates. It counts coordinates in 5 seconds and compare the erlier and measured
                                gps points and calculate the distance between coordinates. At the end of excersice application ask
                                from user that do he/she want to save the excercise information of dismiss it.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Paper>

            <Paper elevation={0} className='portfolioPaper'>
                <Card className='portfolioCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                SD
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
                        image={SDeditor}
                        alt="Service desing editor view"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I made this application view based on service desin courses team work. I use imagination to create this user interface.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(SDeditor)}>
                            <ZoomInIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expandedSD}
                            onClick={() => handleExpandClick("SD")}
                            aria-expanded={expand}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedSD} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>describe:</Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={SDdesktop}
                                alt="Service desing desktop view"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(SDdesktop)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Here is the desktop view from app. I planned this based on our team work documents.

                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={SDmobile}
                                alt="Service desing mobile view"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(SDmobile)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Here is the mobile view what i planned on. Notice that mobile view is to patient and the 
                                desktop view is to healthcare employees. This app is measuring, how the patient is handling with his/her disiase.
                            </Typography>

                        </CardContent>
                    </Collapse>
                </Card>

                <Card className='portfolioCard'>
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
                        image={postmarkApp2}
                        alt="Postmark app"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This application search post marks from database and print out with a picture to
                            web site. You can search the postmarks based on artist, publish year or name.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(postmarkApp2)}>
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(PhoneAppCamera)}>
                            <CodeIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expandedAppSem}
                            onClick={() => handleExpandClick("AppSem")}
                            aria-expanded={expand}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedAppSem} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Description:</Typography>
                            <Typography paragraph>
                                Application keeps postmarks information on database and take images from websie.
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={postmarkApp}
                                alt="Postmark app"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(postmarkApp)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Here we search the post marks based on keyword 
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={postmarkApp3}
                                alt="Postmark app"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(postmarkApp3)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Here we search post marks based on artist name
                            </Typography>
                            <CardMedia
                                component="img"
                                height="194"
                                image={postmarkApp4}
                                alt="Postmark app"
                            />
                            <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(postmarkApp4)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography>
                                The last photo tells about the error handling, if the user given search word is not given any search values
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Paper>

            <Paper elevation={0} className='portfolioPaper'>
                <Card className='portfolioCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                GC
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
                            I make this game with Unreal engine 5.23. Only graphical side. In this work i use foliage tools,
                            landscape tools, material tools and unreal own editor to fix collacion in house mesh.
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
                            onClick={() => handleExpandClick("game")}
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

                <Card className='portfolioCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                ???
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
                            onClick={() => handleExpandClick("some")}
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
            <Dialog open={openImageExpand}
                className='portfolioImageExpandDialog'
                fullScreen={true}
            >
                <CardMedia
                    component="img"
                    className='portfolioCardmedia'
                    image={imageExpand}
                    alt="Paella dish"
                />
                <DialogActions><Button variant="contained"
                    color='inherit'
                    onClick={() => setOpenImageExpand(false)}
                >Close image expand</Button></DialogActions>
            </Dialog>
        </Container></>)
}

export default Portfolio;