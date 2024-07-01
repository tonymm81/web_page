import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Container, Dialog, Fab, Fade, FormControlLabel, Grow, IconButton, IconButtonProps, Paper, styled, Switch, Typography } from "@mui/material";
import '../App.css'
import { useEffect, useState } from "react";
import weatherstation from '../photos/weatherstationFront.jpg'
import weatherstationBack from '../photos/weatherstationBack.jpg'
import esp from '../photos/Esp.jpg'
import tableProject from '../photos/tableProject.jpg'
import tableprojectRasbian from '../photos/tableprojectRasbian.jpg'
import WPAcontrol from '../photos/WPAcontrol.jpg'
import wpahighvoltage from '../photos/WPAhighvoltage.jpg'
import tableProjectShematics from'../photos/tableProjectShematics.jpg'
import { red } from "@mui/material/colors";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CodeIcon from '@mui/icons-material/Code';


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
// this component shows my projects. By clicking button, it shows dialog with links to projects code and some photos and descriptions.
function Projects(props?: any) {


    const [openWeatherstation, setOpenWeatherstation] = useState<boolean>(false);
    const [openTableProject, setOpenTableProject] = useState<boolean>(false);
    const [openWPA, setOpenWPA] = useState<boolean>(false);
    const [openBitcoin, setOpenBitcoin] = useState<boolean>(false);
    const [openFrontend, setOpenFrontend] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(false)
    const [checked, setChecked] = useState(false);
    useEffect(() => {

        if (props.headLiner === "My Projects") {

        } else {
            props.setHeadliner("My Projects")//this will change the headliner
            localStorage.setItem("last_path", "/Projects")
            props.setAllowForecast(true)
        }
    }, [])

    return (<Container className="projects" >
        <Container className="middleBoxProjects">
            <Paper className="projectsPaper">
                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                WS
                            </Avatar>
                        }

                        title="Project weatherstation so called magig mirror"
                        subheader="Python3 project"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={weatherstation}
                        alt="Weatherstation front"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I have made this project with raspberry pi3 and 3 dirrefent Esp32 microcontrollers.
                            behind mirror is a old fujitsu's laptop screen with cheap China adapter card. This how i made the screen.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/weather_station">
                            <CodeIcon />
                        </IconButton>
                    </CardActions>

                    <FormControlLabel
                        control={<Switch checked={openWeatherstation} onChange={() => setOpenWeatherstation(!openWeatherstation)} />}
                        label="Show more"
                    />

                    <Collapse in={openWeatherstation} timeout="auto" unmountOnExit>
                        <Grow in={openWeatherstation}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        This device communicates with mqtt. mirror is a broker what listens to upcoming messages from esp's.
                                        Each of esp's are measuring tempereature and humidity and two of them are measuring the lux value from outside also.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={weatherstationBack}
                                        alt="Weatherstation back"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        The broker keeps up the database locally, and when device starts, it get forecast from api service and print it to screen.
                                        In database device saves the measurements, what are coming from esp microcontrollers. The saving time is
                                        1 saving per hour. This broker have also graphical view, where you can search measurements from specific time.
                                        It uses matlibplot to print out to graphics.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={esp}
                                        alt="Esp"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Each of esp's is running with usb power and two of them have dht11 sensor and dht22 sensor and lux sensor.
                                        one of the have only dht22 sensor. I measure the rooms temperature with this and also outside tempereture and hmidity
                                        with this and also lux value from outside.
                                    </Typography>

                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={openWeatherstation} onChange={() => setOpenWeatherstation(!openWeatherstation)} />}
                            label="Show less"
                        />
                    </Collapse>

                </Card>

                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                TP
                            </Avatar>
                        }

                        title="Project Table controller"
                        subheader="Python3 project"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={tableProject}
                        alt="Weatherstation front"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I have made this project with raspberry pi4 and raspberry pi touchscreen. I made the motor control board by my self.
                            In the table there is a gearbox motor what lift desk or lowers it. I measure the distance from floor with ultrasonic sensor.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/table_project">
                            <CodeIcon />
                            </IconButton>
                    </CardActions>
                            <FormControlLabel
                                control={<Switch checked={openTableProject} onChange={() => setOpenTableProject(!openTableProject)} />}
                                label="Show more"
                            />
                    <Collapse in={openTableProject} timeout="auto" unmountOnExit>
                        <Grow in={openTableProject}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        This device has features like you can control wlan outlets and lamps from this device. You can also save or load 
                                        settings, what you want.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={tableprojectRasbian}
                                        alt="Graphical desing desktop view"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                       In this image we see the compact packet of RaspberryPi4 and RasperryPi touch screen 8 inch.
                                       Rasbian is OS in this device and program is in autostart.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={tableProjectShematics}
                                        alt="Graphical desing mobile view"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Next
                                    </Typography>

                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography>
                                        I
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={openTableProject} onChange={() => setOpenTableProject(!openTableProject)} />}
                            label="Show less"
                        />
                    </Collapse>
                </Card>
            </Paper>
        </Container>
        

        <Container className="endBoxProjects">

        <Paper className="projectsPaper">
                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                WP
                            </Avatar>
                        }

                        title="Working place safety automation"
                        subheader="C++ and hardware project"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={WPAcontrol}
                        alt="Weatherstation front"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I have made this project with stm nucleo f303tr and arduino microcontrollers. Program is running with C++
                            and communication to hardware and between microcontrollers is working thru Spi protocol.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/working-place-automation">
                            <CodeIcon />
                        </IconButton>
                    </CardActions>

                    <FormControlLabel
                        control={<Switch checked={openWPA} onChange={() =>{ setOpenWPA(!openWPA) }} />}
                        label="Show more"
                    />

                    <Collapse in={openWPA} timeout="auto" unmountOnExit>
                        <Grow in={openWPA}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        this is my school project. It has been exiting project because i have to study a lot about hardware side.
                                        this device has two microkontrollers. arduino uno and nucleo f303re. arduino keeps the rfid reader(spi)
                                        and communication with nucleo via SPI. Arduino also measures the temperature and adjust the fan speed
                                        depending on set temperature. Set temperature you can adjusment with potentiometer.
                                        Arduino has also 20x4 led screen what uses I2C commmunication.
                                        It also adjust the fan speed via mosfet but there i have to make some optical isolator because motor
                                        distraction signal.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wpahighvoltage}
                                        alt="Weatherstation back"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        The broker keeps up the database locally, and when device starts, it get forecast from api service and print it to screen.
                                        In database device saves the measurements, what are coming from esp microcontrollers. The saving time is
                                        1 saving per hour. This broker have also graphical view, where you can search measurements from specific time.
                                        It uses matlibplot to print out to graphics.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={esp}
                                        alt="Esp"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Each of esp's is running with usb power and two of them have dht11 sensor and dht22 sensor and lux sensor.
                                        one of the have only dht22 sensor. I measure the rooms temperature with this and also outside tempereture and hmidity
                                        with this and also lux value from outside.
                                    </Typography>

                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={openWPA} onChange={() =>{ setOpenWPA(!openWPA) }} />}
                            label="Show less"
                        />
                    </Collapse>

                </Card>

                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                TP
                            </Avatar>
                        }

                        title="Project Table controller"
                        subheader="Python3 project"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={tableProject}
                        alt="Weatherstation front"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I have made this project with raspberry pi4 and raspberry pi touchscreen. I made the motor control board by my self.
                            In the table there is a gearbox motor what lift desk or lowers it. I measure the distance from floor with ultrasonic sensor.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/table_project">
                            <CodeIcon />
                            </IconButton>
                    </CardActions>
                            <FormControlLabel
                                control={<Switch checked={openTableProject} onChange={() => setOpenTableProject(!openTableProject)} />}
                                label="Show more"
                            />
                    <Collapse in={openTableProject} timeout="auto" unmountOnExit>
                        <Grow in={openTableProject}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        This device has features like you can control wlan outlets and lamps from this device. You can also save or load 
                                        settings, what you want.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={tableprojectRasbian}
                                        alt="Graphical desing desktop view"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                       In this image we see the compact packet of RaspberryPi4 and RasperryPi touch screen 8 inch.
                                       Rasbian is OS in this device and program is in autostart.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={esp}
                                        alt="Graphical desing mobile view"
                                    />
                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Next
                                    </Typography>

                                    <IconButton aria-label="Expand image"
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography>
                                        I
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={openTableProject} onChange={() => setOpenTableProject(!openTableProject)} />}
                            label="Show less"
                        />
                    </Collapse>
                </Card>
            </Paper>
        </Container>
      

        <Button variant="contained"
            color="inherit"
            onClick={() => { setOpenWPA(true) }}
            sx={{ margin: 5 }}>Project working place automation</Button>
        <Dialog open={false}>
            <Button variant="contained"
                href="https://github.com/tonymm81/working-place-automation"
            >Link to this project code</Button>
            <Button variant="contained"
                onClick={() => { setOpenWPA(false) }}>Close this view</Button>
            <Typography variant="h3" sx={{ margin: "5px" }} >Workingplace automation control unit</Typography>
            <img src={WPAcontrol} alt="wpa1" />
            <Typography variant="h3" sx={{ margin: "5px" }}>Workingplace automation highvoltage unit</Typography>
            <img src={wpahighvoltage} alt="wpa2" />
            <Typography variant="body1" sx={{ margin: "5px" }} >
                -this is my school project. It has been exiting project because i have to study a lot about hardware side.
                this device has two microkontrollers. arduino uno and nucleo f303re. arduino keeps the rfid reader(spi)
                and communication with nucleo via SPI. Arduino also measures the temperature and adjust the fan speed
                depending on set temperature. Set temperature you can adjusment with potentiometer.
                Arduino has also 20x4 led screen what uses I2C commmunication.
                It also adjust the fan speed via mosfet but there i have to make some optical isolator because motor
                distraction signal.

                Tästä
                Second microcontroller nucleo is the slave device. Arduino gives permission to start and also to shutdown
                with Spi communication. nucleo has second spi communication pins what are controlling spi oled screen
                and two sn74hc595n chips. one chip is for leds and second is using relays via uln2804 chip.
                Relays are connecting the power to sockets. There is 5 sockets where 2 of them are because lights,
                one to soldering station , one to power unit and one to the main power.
                Near screen is three button where user can select what devices should power
                up when permission is true. When soldering is choosed, device keeps watching is
                the user in the room with ultrasonic sensor and motion sensor.
                If not its shutdown the soldering station because fire security and waits if the user is coming back room.
                Device has also wlan(working on it) what ask time from udp and print it to screen.
                Device has also lux sensor what prints the value to screen.<br />
                Parts:<br />
                Arduino uno<br />
                Nucleo f303re microcontroller<br />
                uln2806 chip<br />
                sn74hc595 chip x2pc<br />
                welleman rfid reader<br />
                20x4 I2C lcd screen<br />
                sh1106 oled screen (spi)<br />
                mosfet 2amps<br />
                resistor 18k 4pc<br />
                resistor 800 ohm 6pc<br />
                resistor 300 ohm 4pc<br />
                switch 3pc<br />
                potentiometer 1pc<br />
                ultrasonic sensor HCSR04<br />
                dht11 sensor<br />
                welleman motion sensor<br />
                welleman lux sensor<br />
                leds 8pc<br />
            </Typography>
        </Dialog>

       

        <Button variant="contained"
            color="inherit"
            onClick={() => { setOpenBitcoin(true) }}
            sx={{ margin: 5 }}>Bitcoin app.</Button>
        <Dialog open={openBitcoin}>
            <Button variant="contained"
                href="https://gitfront.io/r/tonymm81/0d9dafd325b5066a6a8332513b451a831d778f85/Bitcoin-app/"
            >Link to projects code</Button>
            <Button variant="contained"
                onClick={() => { setOpenBitcoin(false) }}>Close this view</Button>
            <Typography variant="h3" sx={{ margin: "5px" }}>Bitcoin app made to vincit rising start application</Typography>
            <Typography variant="body1" sx={{ margin: "5px" }} >This application is following the bitcoin course and shows the prices for euros
                and also you can go back in time and check when was the best time to sell or by bitcoins
                I have to use imports because i use a graphical tkinter application andb calendar.
                Also i have to convert the datetime to unix that i can use api servise. and also convert
                unix timestamp to back datetime.
                this how the application works. <br />
                1: choose the start date where you want to bitcoin history
                begin <br />
                2: choose the end date where you want to bitcoin history end <br />
                3: downrate button: after choosing the start and end date this shows how many downrate day is the longest in days <br />
                4: highest button shows the highest price user choosed datetime line <br />
                5: best in pass button shows the best selling and best buying price from history after <br />
                entering the dates to start and end 6: clear search button is because you want to clear earlier search r
                esults datetime
                versions: ver103 graphics and buttons and labels and calendar buil up <br />
                ver104 graphics are quite ready and api search also <br />ver105 Highest price button works like excepted <br />
                ver106 best day to buy and sell button works somehow <br />
                ver107 started to workout the biggest downrate in days counting ver108 version ready, <br />
                i made try, execpt clause if user wont give date to search, and also edit buttons places.</Typography>
        </Dialog>

        <Button variant="contained"
            color="inherit"
            onClick={() => { setOpenFrontend(true) }}
            sx={{ margin: 5 }}>Front end project from school</Button>
        <Dialog open={openFrontend}>
            <Button variant="contained"
                href="https://gitfront.io/r/tonymm81/Y2aTWxe7n7hj/frontend/"
            >Link to this project's code</Button>
            <Button
                variant="contained"
                onClick={() => { setOpenFrontend(false) }}>Close this view</Button>
            <Typography variant="h3" sx={{ margin: "5px" }} >This is my frontend project from school</Typography>
            <Typography variant="body1" sx={{ margin: "5px" }} >
                This is only html and css code. I use css animation and styling on this project.
            </Typography>
        </Dialog>


    </Container>)
}

export default Projects;