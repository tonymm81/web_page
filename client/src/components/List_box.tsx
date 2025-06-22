import { AppBar, Button, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import '../App.css';



interface Props {
  setFeedBackDialog: Dispatch<SetStateAction<boolean>>
}
// This is the drawer and appmenu component where user can navigate
const List_box: React.FC<Props> = (props : Props): React.ReactElement => {

  const [openMenu, setopenMenu] = useState<boolean>(false);

  return (
    <CssBaseline>
      <AppBar position="static" className='list_box' color='transparent'>
        <Toolbar className='toolbar'>
          <IconButton
            className='list_box'
            edge="start"
            onClick={() => setopenMenu(true)}
            sx={{color:"white"}}
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
          ></Typography>
         
          <Button href="https://github.com/tonymm81/web_page" size="small" variant="text" sx={{margin: "2px", color:"white"}}>This site code
          </Button>
          <Button onClick={()=> props.setFeedBackDialog(true)} size="small" variant="text" sx={{margin: "2px", color:"white"}}>Give feedback</Button>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}

export default List_box;