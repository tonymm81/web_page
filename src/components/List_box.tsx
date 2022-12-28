import { AppBar, Button, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import '../App.css';

// This is the drawer and appmenu component where user can navigate
const List_box : React.FC = () : React.ReactElement => {
  
  const [valikkoAuki, setValikkoAuki] = useState<boolean>(false);

  return (
    <CssBaseline>
    <AppBar position="static" className='list_box'>
        <Toolbar className='toolbar'>
          <IconButton
            className='list_box'
            edge="start"
            onClick={() => setValikkoAuki(true)}
          >
            <MenuIcon/>
          </IconButton>

          <Drawer
            open={valikkoAuki}
            onClose={() => setValikkoAuki(false)}
            className='list_box'

          >

            <List
              sx={{
                width : "220px",
                marginTop : "50px"
              }}
              onClick={() => setValikkoAuki(false)}
            >
              <ListItemButton
                component={Link}
                to="/"
              >
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home page" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/Forecast"
              >
                <ListItemIcon>
                  <NightsStayIcon/>
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/Work_time"
              >
                <ListItemIcon>
                  <EditIcon/>
                </ListItemIcon>
                <ListItemText primary="Working time" />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/Projects"
              >
                <ListItemIcon>
                  <CodeIcon/>
                </ListItemIcon>
                <ListItemText primary="My projects" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/AboutMe"
              >
                <ListItemIcon>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText primary="About me" />
              </ListItemButton>

            </List>
            
          </Drawer>

        <Typography 
            component="div"
            sx={{fontSize: "25pt", flexGrow : 1}}
            className='list_box'
        >Menu</Typography>
        <Button onClick={() => (alert("perkele!!"))} >perkele</Button>
        </Toolbar>
    </AppBar>
    </CssBaseline>
  );
}

export default List_box;