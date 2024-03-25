import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../static/images/manhart-logo.png';
import {useEffect, useState} from "react";
import ResponsiveSideBar from "../ResponsiveSideBar/ResponsiveSideBar";
import {Link} from "@mui/material";
import {
    Construction,
    EmojiEvents,
    EmojiPeople,
    Gavel,
    LocationOn,
    Quiz,
    SupportAgent,
    YouTube
} from "@mui/icons-material";


const userPages = ['Videos', 'Services', 'Stories', 'Location', 'Tools', 'About Me', 'Disclaimer', 'FAQ'];
const settings = ['My Profile', 'My Workouts', 'Logout'];
const userName = 'Eran Meir';

type ButtonInfo = {
    text: string;
    icon: React.ComponentType;
};
const buttonDictionary: Record<string, ButtonInfo> = {
    Videos: {text: 'Videos', icon: YouTube},
    Services: {text: 'Services', icon: SupportAgent},
    Stories: {text: 'Stories', icon: EmojiEvents},
    Location: {text: 'Location', icon: LocationOn},
    Tools: {text: 'Tools', icon: Construction},
    'About Me': {text: 'About Me', icon: EmojiPeople},
    Disclaimer: {text: 'Disclaimer', icon: Gavel},
    FAQ: {text: 'FAQ', icon: Quiz},
};

function getButtonDetails(buttonText: string): ButtonInfo | undefined {
    return buttonDictionary[buttonText];
}

function ResponsiveAppBar() {
    // State to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleResponsiveSideBar = () => {
        setIsOpen(!isOpen);
    };

    // Check for existing login on component mount (optional)
    useEffect(() => {
        // Check local storage or other mechanism for login state
        const storedLogin = localStorage.getItem('isLoggedIn');
        if (storedLogin) {
            setIsLoggedIn(true);
        }
    }, []);
    // Function to handle login (replace with your actual login logic)
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (isLoggedIn) {
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="static" sx={{borderRadius: '20px'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href="/">
                        <Box component="img" src={logo} alt="Logo"
                             sx={{width: 100, height: 60, mr: 4, display: {md: 'flex'}}}/>
                    </a>
                    {/* Referring to the Homepage / index.html */}

                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <YouTube/>
                        Videos
                    </Button>
                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <SupportAgent/>
                        Services
                    </Button>
                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <EmojiEvents/>
                        Stories
                    </Button>
                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <LocationOn/>
                        Location
                    </Button>
                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <Construction/>
                        Tools
                    </Button>
                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <EmojiPeople/>
                        About Me
                    </Button>
                    <Button variant="contained" color="primary" href="/your-other-page"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}, wrap: 'noWrap', color: 'white'}}>
                        <Gavel/>
                        Disclaimer
                    </Button>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0, ml: 6}}>
                                {!isLoggedIn && (
                                    <Button
                                        sx={{padding: 2, color: 'white', display: 'block'}}
                                        onClick={handleLogin}>
                                        LOGIN
                                    </Button>
                                )}
                                {isLoggedIn && <Avatar alt={userName} src={logo}/>}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;