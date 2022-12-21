import { AppBar, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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
                to="/info"
              >
                <ListItemIcon>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/info"
              >
                <ListItemIcon>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText primary="Working time" />
              </ListItemButton>

            </List>
            
          </Drawer>

        <Typography 
            component="div"
            sx={{fontSize: "16pt", flexGrow : 1}}
            className='list_box'
        >Valikko</Typography>
        </Toolbar>
    </AppBar>
    </CssBaseline>
  );
}

export default List_box;