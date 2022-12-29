import { Box, Button, Container, Dialog } from "@mui/material";
import '../App.css'
import { useState } from "react";
import weatherstation from '../photos/weatherstationFront.jpg'
import weatherstationBack from '../photos/weatherstationBack.jpg'
import esp from '../photos/Esp.jpg'
import tableProject from '../photos/tableProject.jpg'
import tableprojectRasbian from '../photos/tableprojectRasbian.jpg'
import WPAcontrol from '../photos/WPAcontrol.jpg'
import wpahighvoltage from '../photos/WPAhighvoltage.jpg'


function Projects(props?:any){
    props.setHeadliner("My Projects")
    const [openWeatherstation, setOpenWeatherstation] = useState<boolean>(false);
    const [openTableProject, setOpenTableProject] = useState<boolean>(false);
    const [openWPA, setOpenWPA] = useState<boolean>(false);
    const [openBitcoin, setOpenBitcoin] = useState<boolean>(false);
    const [openFrontend, setOpenFrontend] = useState<boolean>(false);

    return(<Container className="projects" >    
    
        <Button variant="contained" 
            color="inherit"
            onClick={()=>{setOpenWeatherstation(true)}}
            sx={{margin:5}}>Project weatherstation
        </Button>
        <Dialog open={openWeatherstation} className='projectDialog'>
            <Button variant="contained"
               href="https://gitfront.io/r/tonymm81/984bdd8be3b18a8ec53f2e2a645b66b6d605abfd/weatherstation/" 
               >Link to projects code</Button>
            <Button variant="contained" 
                onClick={()=>{setOpenWeatherstation(false)}}>Close this view</Button>
                    <h2>Weatherstation front</h2>
                        <img src={weatherstation} alt="ws1"/>
                    <h2>Weatherstation back</h2>
                        <img src={weatherstationBack} alt="ws2"/>
                    <h2>Esp (client) microcontroller</h2>
                        <img src={esp} alt="ws3"/>
                        <div className="divTag">
                        this is a weatherstation where is connected two esp32 boards to raspberry pi3 and one raspberry pi2 is connected also. 
                        each esp boards has 2 dht11 sensors and rasbperrypi 2 has one. <br/>
                        rasbperrypi2 is a hedgehogs spinning wheel calculator what updates the temperatures and spinning records per hour
                        esp softwares are in own folders. esp:kitchen etc..<br/>
                        and hedgehogs spinning wheel calculator is own folder called calculator<br/>
                        and main device files are in main device. this device is keeping the database up and updates the values inside it.<br/>
                         it also is a mqtt broker. main device has tkinter window where it show information. it updates this 4 dht11 sensors from espboards 
                         to screen and once per hour it updates the temp and hum to database. 
                         it calculates the average value from temp in 4 sensors and rasbperrypi 2 dht sensor also. it have program called hedgehogmqtt.py 
                         what listens if the raspberrypi2 sends a temps or results of spinning wheel.
                        this maindevice also takes a week forecast from api service.
                        raspberry pi2 is a counter what keeps writing records to logfile, and thingspeak api service and in main device database. 
                        this device has magnetic pulse sensors in spinning wheel and small piece of iron. when sensor activates it takes rasbperri pi 2 gpio pin up. 
                        then the program calculated 1 round. there is also timestamps inside of this laskuriapi.py file. i make a module what sends data to main device. 
                        file name is hedgehog.py. laskuriapi calls it when time condition is true:
                        i put the comments to code so perhaps it explain how this works. there is also plan.txt where you can see the plans and bugs and reports etc.
                        here is the files what i code: main device: weatherstation.py hedgehogmqtt.py database.py forecast.py<br/>
                        and esp boards boot.py<br/>
                        in hedgehogs spinning wheel calculator laskuriapi.py hedgehog.py<br/>
                        sort describe: weatherstation.py keeps graphics up and update the sensor measurements to screen.<br/> this main program calls also forecast.py where we get a 5 day forecast.<br/>
                        hedgehogmqtt.py listens to connection from raspberrypi2 calculator.<br/> when it sends a message this program upload the recieved data to database.<br/>
                        database.py is handling the database and programs are calling it when the time rule is true.<br/>
                        forecast.py i e here free api service where i get this information. this forecasti is calling only then when program is starting.<br/>
                        boot.py is file what is inside the esp32 boards.<br/> this measure the sensor data and send it to broker(main device)<br/>
                        laskuriapi.py is calculating the wheel rounds with gpio pin from raspberry pi 2.<br/>this program keeps a log file and every hour it start from 0 and keep the old measurements. <br/>
                        this program also upload the data to thingview and also upload the data to main device with mqtt.<br/>
                        hedgehog.py is the program what is mqtt client.<br/>when time rule is true it upload the spinning wheel rounds and temperature and humidity to main device.
                        scroll.py <br/>is the view where we printout the database data what user want to search
                        dbsearch.py <br/>is popup window application what we call from weatherstation. there user choice what device data history she/he want to search
                        known bugs at ver122: <br/>database wont show timestamp to hedgehogs runnings scroll.py is not ready yet. its ugly view
                        connections.py appears on ver122.<br/> this is own program to mqtt connections. 
                        this communicates to database and main program weatherstation with pickle message include python list. once per hour it calls 
                        <br/>database.py programs function and upload the data in database. 
                        in database.py i create this file to upload the measurements to mariadb.<br/> why mariadb? because it is the best!!
                        added bedroom esp board temperature measurements. appears on ver 121</div>
        </Dialog>
    
        <Button variant="contained" 
            color="inherit"
            onClick={()=>{setOpenWPA(true)}}
            sx={{margin:5}}>Project working place automation</Button>
        <Dialog open={openWPA}>
            <Button variant="contained"
                href="https://gitfront.io/r/tonymm81/22e01bc9d177f854f1bff6a0aee8ca400c1ba95c/working-place-automation/" 
                >Link to this project code</Button>
            <Button variant="contained"
            onClick={()=>{setOpenWPA(false)}}>Close this view</Button>
                <h2>Workingplace automation control unit</h2>
                    <img src={WPAcontrol} alt="wpa1"/>
                <h2>Workingplace automation highvoltage unit</h2>
                    <img src={wpahighvoltage} alt="wpa2"/>
                    <div className="divTag">
                    -this is my school project. It has been exiting project because i have to study a lot about hardware side.
                    this device has two microkontrollers. arduino uno and nucleo f303re. arduino keeps the rfid reader(spi) 
                    and communication with nucleo via SPI. Arduino also measures the temperature and adjust the fan speed 
                    depending on set temperature. Set temperature you can adjusment with potentiometer. 
                    Arduino has also 20x4 led screen what uses I2C commmunication. 
                    It also adjust the fan speed via mosfet but there i have to make some optical isolator because motor 
                    distraction signal.
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
                      Device has also lux sensor what prints the value to screen.<br/>
                    Parts:<br/>
                    Arduino uno<br/>
                    Nucleo f303re microcontroller<br/>
                    uln2806 chip<br/>
                    sn74hc595 chip x2pc<br/>
                    welleman rfid reader<br/>
                    20x4 I2C lcd screen<br/>
                    sh1106 oled screen (spi)<br/>
                    mosfet 2amps<br/>
                    resistor 18k 4pc<br/>
                    resistor 800 ohm 6pc<br/>
                    resistor 300 ohm 4pc<br/>
                    switch 3pc<br/>
                    potentiometer 1pc<br/>
                    ultrasonic sensor HCSR04<br/>
                    dht11 sensor<br/>
                    welleman motion sensor<br/>
                    welleman lux sensor<br/>
                    leds 8pc<br/>
                    </div>
        </Dialog>
    
        <Button variant="contained" 
            color="inherit"
            onClick={()=>{setOpenTableProject(true)}}
            sx={{margin:5}}>Project table and wlan control.</Button>
        <Dialog open={openTableProject}>
            <Button variant="contained" 
                href="https://gitfront.io/r/tonymm81/Ckr76hdkyo8S/table-project/"
                 >Link to this project code</Button>
            <Button variant="contained"
                onClick={()=>{setOpenTableProject(false)}}>close this view</Button>
                <h2>Table and wlan devices control</h2>
                    <img src={tableProject} alt="tp1"/>
                <h2>Here is rasbian, touch screen and gearbox motor</h2>
                    <img src={tableprojectRasbian} alt="tp2"/>
                    <div className="divTag">
                    This project is for adjusment of table level from floor. 
                    It has also graphical interface where you can control the desk level and wlan plugs and bulbs.
                    it has rasbperry pi4, 7 inch touch screen, uln2804 chip, three relays and resistors. 
                    there is also gearbox motor what lift or lower the desk. 
                    ultrasonic sensor measures the desk distance from floor and you can save your favorite setup and load it later. 
                    We can save all light and plugs setup and distance from floor.
                    </div>
        </Dialog>

        <Button variant="contained" 
            color="inherit"
            onClick={()=>{setOpenBitcoin(true)}}
            sx={{margin:5}}>Bitcoin app.</Button>
        <Dialog open={openBitcoin}>
            <Button variant="contained" 
                href="https://gitfront.io/r/tonymm81/0d9dafd325b5066a6a8332513b451a831d778f85/Bitcoin-app/" 
                >Link to projects code</Button>
            <Button variant="contained"
                onClick={()=>{setOpenBitcoin(false)}}>Close this view</Button>
                <h2>Bitcoin app made to vincit rising start application</h2>
                This application is following the bitcoin course and shows the prices for euros 
                and also you can go back in time and check when was the best time to sell or by bitcoins
                I have to use imports because i use a graphical tkinter application andb calendar. 
                Also i have to convert the datetime to unix that i can use api servise. and also convert 
                unix timestamp to back datetime.
                this how the application works. <br/>
                1: choose the start date where you want to bitcoin history 
                begin <br/>
                2: choose the end date where you want to bitcoin history end <br/>
                3: downrate button: after choosing the start and end date this shows how many downrate day is the longest in days <br/>
                4: highest button shows the highest price user choosed datetime line <br/>
                5: best in pass button shows the best selling and best buying price from history after <br/>
                entering the dates to start and end 6: clear search button is because you want to clear earlier search r
                esults datetime
                versions: ver103 graphics and buttons and labels and calendar buil up <br/>
                ver104 graphics are quite ready and api search also <br/>ver105 Highest price button works like excepted <br/>
                ver106 best day to buy and sell button works somehow <br/>
                ver107 started to workout the biggest downrate in days counting ver108 version ready, <br/>
                i made try, execpt clause if user wont give date to search, and also edit buttons places.
        </Dialog>
    
        <Button variant="contained" 
            color="inherit"
            onClick={()=>{setOpenFrontend(true)}}
            sx={{margin:5}}>Front end project from school</Button>
            <Dialog open={openFrontend}>
                <Button variant="contained"
                href="https://gitfront.io/r/tonymm81/Y2aTWxe7n7hj/frontend/"
                >Link to this project's code</Button>
                <Button
                variant="contained"
                onClick={()=>{setOpenFrontend(false)}}>Close this view</Button>
                <h2>This is my frontend project from school</h2>
                <div className="digTag">
                    This is only html and css code. I use css animation and styling on this project.
                </div>
            </Dialog>


    </Container>)
}

export default Projects;