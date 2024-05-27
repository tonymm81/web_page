import { AppBar, Button, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import '../App.css';
import { link } from 'fs';

// This is the drawer and appmenu component where user can navigate
const List_box: React.FC = (): React.ReactElement => {

  const [openMenu, setopenMenu] = useState<boolean>(false);

  return (
    <CssBaseline>
      <AppBar position="static" className='list_box' color='transparent'>
        <Toolbar className='toolbar'>
          <IconButton
            className='list_box'
            edge="start"
            onClick={() => setopenMenu(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            open={openMenu}
            onClose={() => setopenMenu(false)}
            className='list_box'

          >

            <List
              sx={{
                width: "220px",
                marginTop: "50px"
              }}
              onClick={() => setopenMenu(false)}
            >
              <ListItemButton
                component={Link}
                to="/"
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home page" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/Forecast"
              >
                <ListItemIcon>
                  <NightsStayIcon />
                </ListItemIcon>
                <ListItemText primary="Forecast" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/Work_time"
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Working time" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/Projects"
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="My projects" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/News_page"
              >
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="News page" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/AboutMe"
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About me" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/Portfolio"
              >
                <ListItemIcon>
                  <BadgeIcon />
                </ListItemIcon>
                <ListItemText primary="Portfolio" />
              </ListItemButton>


            </List>

          </Drawer>

          <Typography
            component="div"
            sx={{ fontSize: "25pt", flexGrow: 1 }}
            className='list_box'
          >Menu</Typography>
          {/*<div className='mobileView'>
            <Button variant='contained' size='small'
              component={Link} to="/Forecast"
              sx={{ marginBottom: "10px" }}>Forecast</Button>
            <Button variant='contained' size='small'
              component={Link} to="/Projects"
              sx={{ marginBottom: "10px" }}>My projects</Button>
            <Button variant='contained' size='small'
              component={Link} to="/News_page"
              sx={{ marginBottom: "10px" }}>News page</Button>
            <Button variant='contained' size='small'
              component={Link} to="/AboutMe"
              sx={{ marginBottom: "10px" }}>about me</Button>
            <Button variant='contained' size='small'
              component={Link} to="/Work_time"
              sx={{ marginBottom: "10px" }}>Working time</Button>
            <Button variant='contained' size='small'
              component={Link} to="/"
            sx={{ marginBottom: "10px" }}>Homepage</Button></div>*/}
          <Button href="https://github.com/tonymm81/web_page" size="small">This web page code github link</Button>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}

export default List_box;