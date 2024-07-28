import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Avatar, Backdrop, Box, Button, CircularProgress, Container, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



function Footer(props?: any) {
    const navigate = useNavigate();
    return(
        <>
        <Box className="footerBox" key={"footerBox"}>
            <Typography variant="h6" sx={{margin:"7px"}}>Quick links:</Typography>
            <Box className="footerLinkGroup" key={"footerLinkGroup"}>
            
            <Link
                    
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: 'smooth' });

                    }}
                    >
                   Home
                </Link>
                <Link
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/Forecast");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    Forecast
                </Link>
                <Link
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/Projects");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    Projects
                </Link>
            </Box>
            <Box className="footerLinkGroupSecond" key={"footerLinkGroupSecond"}>
                <Link
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/Work_time");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    Work time app
                </Link>
                <Link
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/News_page");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    News app
                </Link>
                <Link
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/Portfolio");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    Portfolio
                </Link>
                <Link
                    component="button"
                    sx={{margin:"7px"}}
                    variant="body1"
                    onClick={() => {
                        navigate("/AboutMe");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >
                    About me
                </Link>
            </Box>
            <Box className="sosialMediaLinks">
                
                    <Link href="https://www.facebook.com/toni.maenpaa.96/" rel="noopener" target="_blank" sx={{margin:"10px"}}
                    ><FacebookIcon fontSize="medium"/>Facebook
                    </Link>
               
                <Link href="https://www.linkedin.com/in/toni-m%C3%A4enp%C3%A4%C3%A4-404461222?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BOeeqQCSWQ4eWH4PdDUm2Wg%3D%3D" rel="noopener" target="_blank" sx={{margin:"10px"}}
                    > <LinkedInIcon fontSize='medium'/>Linkeldin
                    </Link>
            </Box>
        </Box>
        </>
    )
}

export default Footer;