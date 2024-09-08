import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Avatar, Backdrop, Button, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Container, Dialog, DialogActions, IconButton, IconButtonProps, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, makeStyles, styled } from '@mui/material';
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
import unrealEditor from '../photos/unreal.jpg'
import unrealStart from '../photos/unrealStart.jpg'
import unrealMiddle from '../photos/unrealMiddle.jpg'
import unrealHouse from '../photos/unrealHouse.jpg'
import unrealInside from '../photos/unrealHouseInside.jpg'
import protosite1 from '../photos/sivuProto1.png';
import protosite2 from '../photos/sivuProto2.png';
import protosite3 from '../photos/sivuProto3.png';
import protosite4 from '../photos/sivuproto4.png'

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
            <Paper elevation={0} className='portfolioPaper' sx={{backgroundColor:"aliceblue"}}>
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
                            color palettes and views to mobile and desktop. I made this with Adobe illustrator.
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
                                I lookout the old page and take there from logo the colorpalette what I use in my work.
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
                            to develope phone applications. I use the Expo device libraries. I am developing this app forward so this is only the one version.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialog(PhoneAppCamera)}>
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/Phone-app">
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

            <Paper elevation={0} className='portfolioPaper' sx={{backgroundColor:"aliceblue"}}>
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
                            I made this application view based on service desin courses team work. I use imagination to create this user interface. Color palettes I was asking opinion from my team workers.
                            I made this with Adobe illustrator.

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

            <Paper elevation={0} className='portfolioPaper' sx={{backgroundColor:"aliceblue"}}>
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
                        image={unrealEditor}
                        alt="Unreal editor"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I make this game with Unreal engine 5.23. Only graphical side. In this work i use foliage tools,
                            landscape tools, material tools and unreal own editor to fix collacion in house mesh.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                    <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(unrealEditor)}>
                                <ZoomInIcon />
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
                            <Typography paragraph>Description:</Typography>
                            <CardMedia
                                    component="img"
                                    height="194"
                                    image={unrealStart}
                                    alt="unreal start"
                                />
                             <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(unrealStart)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                Here is a start view. You can watch the whole video from youtube. The links is end of this card content.
                                I use here foliage tools, landscape tools and I try to do this start view good looking.
                            </Typography>
                            <CardMedia
                                    component="img"
                                    height="194"
                                    image={unrealMiddle}
                                    alt="unreal middle"
                                />
                             <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(unrealMiddle)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                This screenshot is from the middle of the game level.
                            </Typography>
                            <CardMedia
                                    component="img"
                                    height="194"
                                    image={unrealHouse}
                                    alt="unreal middle"
                                />
                             <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(unrealHouse)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                This screen is from outside of house. I have materialised the house and fix the collasion points of all meshes
                            </Typography>
                            <CardMedia
                                    component="img"
                                    height="194"
                                    image={unrealInside}
                                    alt="unreal middle"
                                />
                             <IconButton aria-label="Expand image"
                                onClick={() => openImageExpandDialog(unrealInside)}>
                                <ZoomInIcon />
                            </IconButton>
                            <Typography>
                                This last image is from inside the house. I add also free funiture package to house. Here is also full video from game.
                                <Button href="https://youtu.be/6QVSXqKT3qc" size="small">See the full video here</Button>
                                <Link></Link>
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>

                <Card className='portfolioCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                KV
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Koodariverstas proto site"
                        subheader="Year 2024"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={protosite1}
                        alt="Proto site"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This site is my work trainee work from Xamk TKI research project. 
                            This site is made top of mediawiki site and i customise the Tweeki skin with own styles.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites"
                             href="https://github.com/tonymm81/KoodariverstasProto">
                        <CodeIcon />
                        </IconButton>
                        <IconButton aria-label="zoomProtosite"
                             onClick={() => openImageExpandDialog(protosite1)}>
                            <ZoomInIcon />
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
                            <Typography paragraph>Main page view</Typography>
                            <CardMedia
                            component="img"
                            height="194"
                            image={protosite2}
                            alt="Proto site"
                            />
                             <IconButton aria-label="zoom proto 2"
                              onClick={() => openImageExpandDialog(protosite2)}>
                            <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                This site is a databank to junior developer intern and students. Here you can find articles of all kind of 
                                work depenging are you programmer, designer or manager. I make tree different brake points to this site.
                                Here is also some Javascript, what directs user to use categories. The all articles block is working with 
                                categories. There is also ready site templates based on categories, and template has a menu and more category
                                links to easier navigation in this page. 
                            </Typography>
                            <Typography paragraph>Main page second brake point</Typography>
                            <CardMedia
                            component="img"
                            height="194"
                            image={protosite3}
                            alt="Proto site"
                            />
                             <IconButton aria-label="zoom proto 2"
                              onClick={() => openImageExpandDialog(protosite3)}>
                            <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                All articles blck is working with custom rendered divs. You can set this divs any where in wiki an they
                                print out the a link list, where is allsites under this category. 
                            </Typography>
                            <Typography paragraph>Customized footer</Typography>
                            <CardMedia
                            component="img"
                            height="194"
                            image={protosite4}
                            alt="Proto site"
                            />
                             <IconButton aria-label="zoom proto 2"
                              onClick={() => openImageExpandDialog(protosite4)}>
                            <ZoomInIcon />
                            </IconButton>
                            <Typography paragraph>
                                See and test the whole site on address  <Button href="https://tonymm81.kapsi.fi/mediawiki/index.php" size="small">See the site here</Button>
                                You need a username and password because this is prototype and it's not public. Username is <strong>mediawikiuser</strong> and password is
                                : <strong>V1$1tW1ki1@2#</strong>. In this site you might face the 502 error but just refresh your browser. I am figure out about this error.
                                sorry about it.
                            </Typography>
                            <Typography paragraph>
                                I will tell more about this site in git hub readme.md file. Visit  <Button href="https://github.com/tonymm81/KoodariverstasProto" size="small">My github repository</Button>
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