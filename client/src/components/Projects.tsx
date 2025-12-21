import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Container, Dialog, DialogActions, Fab, Fade, FormControlLabel, Grow, IconButton, IconButtonProps, Paper, styled, Switch, Typography } from "@mui/material";
import '../App.css'
import { useEffect, useState } from "react";
import weatherstation from '../photos/weatherstationFront.jpg'
import weatherstationBack from '../photos/weatherstationBack.jpg'
import esp from '../photos/Esp.jpg'
import tableProject from '../photos/tableProject.jpg'
import tableprojectRasbian from '../photos/tableprojectRasbian.jpg'
import WPAcontrol from '../photos/WPAcontrol.jpg'
import wpahighvoltage from '../photos/WPAhighvoltage.jpg'
import tableProjectShematics from '../photos/tableProjectShematics.jpg'
import wpschematics1 from '../photos/wp-schematics1.png'
import wpschematics2 from '../photos/wp-schematics2.png'
import frontend1 from '../photos/frontend1.png'
import frontend2 from '../photos/frontend2.png'
import frontend3 from '../photos/frontend3.png'
import frontend4 from '../photos/frontend4.png'
import frontend5 from '../photos/frontend5.png'
import jopunpage from '../photos/j_maenpaa_page.png'
import jopunpage1 from '../photos/j_maenpaa_page1.png'
import jopunpage2 from '../photos/j_maenpaa_page2.png'
import wlanControlApp1 from '../photos/WlanController1.png.png'
import wlanControlApp2 from '../photos/androidProject.png'
import wlanControlApp3 from '../photos/androidProject1.png'
import wlanControlApp4 from '../photos/androidProject2.png'
import soon from '../photos/soon.png'
import { red } from "@mui/material/colors";

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CodeIcon from '@mui/icons-material/Code';



// this component shows my projects. By clicking button, it shows dialog with links to projects code and some photos and descriptions.
function Projects(props?: any) {


    const [openWeatherstation, setOpenWeatherstation] = useState<boolean>(false);
    const [openTableProject, setOpenTableProject] = useState<boolean>(false);
    const [openWPA, setOpenWPA] = useState<boolean>(false);
    const [openBitcoin, setOpenBitcoin] = useState<boolean>(false);
    const [openFrontend, setOpenFrontend] = useState<boolean>(false);
    const [openWlanController, setOpenWlanController] = useState<boolean>(false);
    const [openWebProject, setOpenWebProject] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(false)
    const [checked, setChecked] = useState(false);
    const [OpenProjectDialog, setOpenProjectDialog] = useState(false);
    const [projectImage, setProjectImage] = useState<string>("")
    const openImageExpandDialogProjects = (projectImage: string): void => {
        setOpenProjectDialog(true)
        setProjectImage(projectImage)
    }
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
            <Paper className="projectsPaper" sx={{ backgroundColor: "aliceblue" }}>
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
                            I built this project using a Raspberry Pi 3 and three different ESP32 microcontrollers.
                            Behind the mirror is an old Fujitsu laptop screen connected with a cheap adapter board from China.
                            This is how I created the display setup.
                            If you want to enlarge the image, press the zoom button, and the code can be found under the {"<>"} button.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialogProjects(weatherstation)}
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
                                        This device communicates using MQTT.
                                        The mirror acts as a broker that listens for incoming messages from the ESP devices.
                                        Each ESP measures temperature and humidity, and two of them also measure the outdoor lux value.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={weatherstationBack}
                                        alt="Weatherstation back"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(weatherstationBack)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        The broker maintains a local database, and when the device starts, it fetches the weather forecast from an API service and displays it on the screen.
                                        The database stores all measurements received from the ESP microcontrollers, with one entry saved per hour.
                                        The broker also includes a graphical view where you can search for measurements from a specific time period.
                                        It uses Matplotlib to generate the graphs.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={esp}
                                        alt="Esp"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(esp)}

                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Each ESP runs on USB power. Two of them have a DHT11 sensor, a DHT22 sensor and a lux sensor,
                                        and one of them has only a DHT22 sensor.
                                        With these devices I measure the indoor temperature, and from outside I measure temperature, humidity
                                        and the lux value.

                                    </Typography>

                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={!openWeatherstation} onChange={() => setOpenWeatherstation(!openWeatherstation)} />}
                            label="Show less"
                        />
                    </Collapse>

                </Card>

                <Card className='projectsCard' >
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
                        alt="Table project"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I built this project using a Raspberry Pi 4 and a Raspberry Pi touchscreen.
                            I designed and built the motor control board myself.
                            Inside the table there is a gearbox motor that raises or lowers the desk, and the distance from the floor is measured with an ultrasonic sensor.
                            If you want to enlarge the image, press the zoom button, and the code can be found under the {"<>"} button.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialogProjects(tableProject)}

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
                                        This device includes features such as controlling WLAN outlets and lamps directly from the interface.
                                        You can also save and load any settings you want.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={tableprojectRasbian}
                                        alt="Raspberry pi an screen"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(tableprojectRasbian)}

                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        In this image you can see the compact setup of the Raspberry Pi 4 and the 8‑inch Raspberry Pi touchscreen.
                                        The device runs Raspbian, and the program starts automatically on boot.
                                        This project also includes an Android app for controlling WLAN outlets.

                                    </Typography>
                                    <Typography paragraph>
                                        Here are the schematics I created for this device.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={tableProjectShematics}
                                        alt="table project schematics"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(tableProjectShematics)}

                                    >
                                        <ZoomInIcon />
                                    </IconButton>



                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={!openTableProject} onChange={() => setOpenTableProject(!openTableProject)} />}
                            label="Show less"
                        />
                    </Collapse>
                </Card>
            </Paper>
        </Container>


        <Container className="endBoxProjects">

            <Paper className="projectsPaper" sx={{ backgroundColor: "aliceblue" }}>
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
                        alt="Wpa control unit front"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            I built this project using an STM Nucleo F303RE and Arduino microcontrollers.
                            The program is written in C++, and communication with the hardware — as well as between the microcontrollers — is handled through the SPI protocol.
                            If you want to enlarge the image, press the zoom button, and the code can be found under the {"<>"} button.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialogProjects(WPAcontrol)}

                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/working-place-automation">
                            <CodeIcon />
                        </IconButton>
                    </CardActions>

                    <FormControlLabel
                        control={<Switch checked={openWPA} onChange={() => { setOpenWPA(!openWPA) }} />}
                        label="Show more"
                    />

                    <Collapse in={openWPA} timeout="auto" unmountOnExit>
                        <Grow in={openWPA}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        In the control unit (upper image) there is an Arduino and an STM microcontroller.
                                        The system also includes an RFID tag reader and two displays, one for each microcontroller.

                                        The Arduino acts as the master board and waits for permission from the RFID reader.
                                        When access is granted, the Arduino sends a message via SPI to the STM Nucleo F303RE microcontroller
                                        to allow the station to power up.

                                        The Arduino also controls the fan speed using a temperature sensor, and the user can adjust the
                                        desired temperature with a potentiometer.
                                        Additionally, the Arduino controls the motor speed through a MOSFET.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wpahighvoltage}
                                        alt="Wpa high voltage control"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(wpahighvoltage)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        In the upper image you can see the power control unit.
                                        This unit has a separate power source, because the relays would otherwise cause interference signals.
                                        The relays control the high‑voltage side of the device.

                                        The Nucleo board uses a second set of SPI pins to control the SPI OLED screen and two SN74HC595N shift registers.
                                        One register drives the LEDs, and the other controls the relays through a ULN2804 driver chip.
                                        The relays connect power to the sockets. There are five sockets: two for lights, one for the soldering station,
                                        one for the power unit, and one for the main power.

                                        Next to the screen are three buttons that let the user select which devices should power up when permission is granted.
                                        When the soldering station is selected, the device monitors whether the user is in the room using an ultrasonic sensor
                                        and a motion sensor. If the user leaves, the system shuts down the soldering station for fire safety and waits
                                        to see if the user returns.

                                        The device also has WLAN support (currently in progress), which retrieves the time via UDP and displays it on the screen.

                                    </Typography>

                                    <Typography paragraph>
                                        I made the schematics from this device.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wpschematics1}
                                        alt="wp schematics"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(wpschematics1)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wpschematics2}
                                        alt="wp schematics 2"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(wpschematics2)}

                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
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

                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={!openWPA} onChange={() => { setOpenWPA(!openWPA) }} />}
                            label="Show less"
                        />
                    </Collapse>

                </Card>

                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                FE
                            </Avatar>
                        }

                        title="School front end project"
                        subheader="HTML and CSS project"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={frontend1}
                        alt="Front end project main page"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This is my oldest school project from a frontend course.
                            I created a lot of CSS animations for this page, using only HTML and CSS.
                            The animations are placed in the front‑page navigation.
                            If you want to enlarge the image, press the zoom button, and the code can be found under the {"<>"} button.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialogProjects(frontend1)}

                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://gitfront.io/r/tonymm81/Y2aTWxe7n7hj/frontend/">
                            <CodeIcon />
                        </IconButton>
                    </CardActions>
                    <FormControlLabel
                        control={<Switch checked={openFrontend} onChange={() => setOpenFrontend(!openFrontend)} />}
                        label="Show more"
                    />
                    <Collapse in={openFrontend} timeout="auto" unmountOnExit>
                        <Grow in={openFrontend}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        In next image we see a simple photo album. It uses iframe to show the
                                        image in bigger size. There is also a short description to images.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={frontend2}
                                        alt="Front end second page"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(frontend2)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Next image tell about my projects. The blocks are animated, and they
                                        grow bigger, when the mouse pointer is top of it.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={frontend3}
                                        alt="Front end third image"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(frontend3)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Next image tells about my cv and school proccess details. It is made with
                                        iframe and photos are in small review window.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={frontend4}
                                        alt="Front end fourth image"
                                    />

                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(frontend4)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        Last image tell about my hobbies. There is also two video tag, what are linked to
                                        local video files.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={frontend5}
                                        alt="Front end fifth image"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(frontend5)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={!openFrontend} onChange={() => setOpenFrontend(!openFrontend)} />}
                            label="Show less"
                        />
                    </Collapse>
                </Card>
            </Paper>
        </Container>

        <Container className="endBoxProjects">

            <Paper className="projectsPaper" sx={{ backgroundColor: "aliceblue" }}>
                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                APP
                            </Avatar>
                        }

                        title="Wlan controller android app"
                        subheader="Phone app, what is created with React native "
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={wlanControlApp1}
                        alt="Wpa control unit front"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This project is connected to my table project.
                            The table project includes a Python Flask server that listens on a specific port.
                            When the Android app sends an HTTP request, it can change the table’s height measurement
                            or control the WLAN outlets and WLAN lamps.

                            If you want to enlarge the image, press the zoom button, and the code can be found under the {"<>"} button.

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialogProjects(wlanControlApp1)}

                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/WlanDeviceControlApp">
                            <CodeIcon />
                        </IconButton>
                    </CardActions>

                    <FormControlLabel
                        control={<Switch checked={openWlanController} onChange={() => { setOpenWlanController(!openWlanController) }} />}
                        label="Show more"
                    />

                    <Collapse in={openWlanController} timeout="auto" unmountOnExit>
                        <Grow in={openWlanController}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        At first I tried to add a new feature to my React Native Expo app, but I soon realized that
                                        communicating with a local HTTP or HTTPS server from Expo was almost impossible.
                                        I also tried MQTT, but that didn’t work either.

                                        Because of this, I created a new project without Expo.
                                        Now the Android app can make HTTP GET and POST requests directly to the server.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wlanControlApp2}
                                        alt="Wpa high voltage control"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(wlanControlApp2)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        The Python 3 table project already has working logic for controlling the table height adjustment,
                                        as well as the WLAN lamps and outlets.
                                        I connected this new Android app to the table project so the user can choose which device
                                        they want to use for controlling the WLAN devices and the table.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wlanControlApp3}
                                        alt="Wpa high voltage control"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(wlanControlApp3)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        This app receives a JSON object through an HTTP GET request.
                                        When the JSON object changes for example, when a device is switched off
                                        the app sends an updated JSON object back to the Python Flask server.
                                        The Flask server then checks which device states have changed and updates them accordingly.

                                        This project is not finished yet.
                                        It is built using TypeScript.

                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={wlanControlApp4}
                                        alt="Wpa high voltage control"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(wlanControlApp4)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={!openWlanController} onChange={() => { setOpenWlanController(!openWlanController) }} />}
                            label="Show less"
                        />
                    </Collapse>

                </Card>

                <Card className='projectsCard'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                JM
                            </Avatar>
                        }

                        title="Web page to my fathers company"
                        subheader="Project made with node ejs"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={jopunpage}
                        alt="Front end project main page"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This project is made with Node Ejs and Node express. I choose this technologies, because this kind of site is easier to SEO optimize.
                            This site is showing some parts, what my father sells and contact us page user can send Email to my father and ask more information about parts.
                            If you want to expand the image, press zoom button and code will be found from {"<>"} button.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Expand image"
                            onClick={() => openImageExpandDialogProjects(jopunpage)}

                        >
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton aria-label="view code"
                            href="https://github.com/tonymm81/jopunSivu/">
                            <CodeIcon />
                        </IconButton>
                    </CardActions>
                    <FormControlLabel
                        control={<Switch checked={openWebProject} onChange={() => setOpenWebProject(!openWebProject)} />}
                        label="Show more"
                    />
                    <Collapse in={openWebProject} timeout="auto" unmountOnExit>
                        <Grow in={openWebProject}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 5000 } : {})}><Box sx={{ display: "flex" }}>
                                <CardContent>
                                    <Typography paragraph>Descripe:</Typography>
                                    <Typography paragraph>
                                        I want to test, how I can build a web site with Node EJS. Node Ejs is quite handy way to develope the web site.
                                        Old style html elements is giving you lots of different ways to build the site. Then in the Node express there is site used routings and one
                                        routing is for that email sending.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={jopunpage1}
                                        alt="Front end second page"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(jopunpage1)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                    <Typography paragraph>
                                        I build this site to Upcloud named cloud service. In my server folder I made the https routing with Nginx service.
                                        I also build up the CD/CI pipeline, that it would be easier to develop this site.
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={jopunpage2}
                                        alt="Front end third image"
                                    />
                                    <IconButton aria-label="Expand image"
                                        onClick={() => openImageExpandDialogProjects(jopunpage2)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>

                                    <Typography paragraph>
                                        I have to modify my domain settings, that i can connect the webpage to correct routing.
                                        Site will be found on
                                        <IconButton aria-label="view code"

                                            href="https://joukomaenpaa.fi"
                                            sx={{ fontSize: "14px" }}>
                                            <strong>https://joukomaenpaa.fi</strong>
                                        </IconButton>
                                    </Typography>


                                </CardContent>
                            </Box>
                        </Grow>
                        <FormControlLabel
                            control={<Switch checked={!openWebProject} onChange={() => setOpenWebProject(!openWebProject)} />}
                            label="Show less"
                        />
                    </Collapse>
                </Card>
            </Paper>
        </Container>



        <Button variant="contained"
            color="inherit"
            onClick={() => { setOpenBitcoin(true) }}
            sx={{ margin: 5 }}>Bitcoin app. Check it here</Button>
        <Dialog open={openBitcoin}>
            <Button variant="contained" sx={{margin:1}}
                href="https://gitfront.io/r/tonymm81/0d9dafd325b5066a6a8332513b451a831d778f85/Bitcoin-app/"
            >Link to projects code</Button>
            <Button variant="contained" sx={{margin:1, backgroundColor:"grey"}}
                onClick={() => { setOpenBitcoin(false) }}>Close this view</Button>
            <Typography variant="h3" sx={{ margin: "5px" }}>
                Bitcoin app made for the Vincit Rising Star application
            </Typography>

            <Typography variant="body1" sx={{ margin: "5px", backgroundColor:"grey" }}>
                This application follows the Bitcoin price history and shows the values in euros.
                You can also go back in time to see when it would have been the best moment to buy or sell Bitcoin.
                I used several imports because the project includes a graphical Tkinter interface and a calendar component.
                I also had to convert datetime values to Unix timestamps for the API service, and convert them back afterward.

                This is how the application works: <br />
                1: Choose the start date for the Bitcoin history search. <br />
                2: Choose the end date for the Bitcoin history search. <br />
                3: The "Downrate" button shows the longest continuous downtrend period between the selected dates. <br />
                4: The "Highest" button shows the highest price within the selected date range. <br />
                5: The "Best in past" button shows the best buying and selling points within the selected range. <br />
                6: The "Clear search" button resets the previous search results.

                Versions: <br />
                ver103 – Graphics, buttons, labels and calendar structure created. <br />
                ver104 – Graphics mostly ready and API search implemented. <br />
                ver105 – Highest price button works as expected. <br />
                ver106 – Best day to buy and sell button partially working. <br />
                ver107 – Started implementing longest downrate calculation. <br />
                ver108 – Version ready; added try/except handling for missing dates and adjusted button layout.
            </Typography>

        </Dialog>
        <Dialog open={OpenProjectDialog}
            className='portfolioImageExpandDialog'
            fullScreen={true}
        ><DialogActions><Button variant="contained"
            color='inherit'
            onClick={() => setOpenProjectDialog(false)}
        >Close image expand</Button></DialogActions>
            <CardMedia
                component="img"
                className='portfolioCardmedia'
                image={projectImage}
                alt="Paella dish"
            />
            <DialogActions><Button variant="contained"
                color='inherit'
                onClick={() => setOpenProjectDialog(false)}
            >Close image expand</Button></DialogActions>
        </Dialog>


    </Container>)
}

export default Projects;