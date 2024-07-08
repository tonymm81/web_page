import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Backdrop, Box, Button, CircularProgress, Container, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import NightsStayIcon from '@mui/icons-material/NightsStay';






function Footer(props?: any) {
    const navigate = useNavigate();
    return(
        <>
        <Box className="footerBox" key={"footerBox"}>
            <Typography variant="body1">Quick links:</Typography>
            <Box className="footerLinkGroup" key={"footerLinkGroup"}>
                <Link
                    
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: 'smooth' });

                    }}
                    >
                    Home
                </Link>
                <Link
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/Forecast");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    Forecast
                </Link>
                <Link
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/Projects");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    projects
                </Link>
            </Box>
            <Box className="footerLinkGroupSecond" key={"footerLinkGroupSecond"}>
                <Link
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/Work_time");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    Work time app
                </Link>
                <Link
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/News_page");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    News app
                </Link>
                <Link
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/Portfolio");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    portfolio
                </Link>
                <Link
                    component="button"
                    sx={{margin:"5px"}}
                    variant="body2"
                    onClick={() => {
                        navigate("/AboutMe");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    About me
                </Link>
            </Box>
        </Box>
        </>
    )
}

export default Footer;