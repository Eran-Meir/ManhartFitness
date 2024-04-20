import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../static/images/manhart-logo.png';
import Link from '@mui/material/Link';
import {useEffect, useState} from "react";
import {
    Construction,
    EmojiEvents,
    EmojiPeople, FitnessCenter,
    Gavel,
    LocationOn, Logout,
    Quiz,
    SupportAgent,
    YouTube,
    AccountCircle
} from "@mui/icons-material";

const MIN_WINDOW_SIZE: number = 1200
const profileMenuItems = ['Profile', 'Workouts', 'Logout'];
const userName = 'Eran Meir';
const buttons = ['Videos', 'Services', 'Stories', 'Location', 'Tools', 'About', 'Disclaimer', 'FAQ'];
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
    About: {text: 'About', icon: EmojiPeople},
    Disclaimer: {text: 'Disclaimer', icon: Gavel},
    FAQ: {text: 'FAQ', icon: Quiz},
    Profile: {text: 'Profile', icon: AccountCircle},
    Workouts: {text: 'My Workout', icon: FitnessCenter},
    Logout: {text: 'Logout', icon: Logout},
};

function ResponsiveAppBar() {
    // States
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorElNavMenu, setAnchorElNavMenu] = React.useState<null | HTMLElement>(null); // Nav Menu
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null); // User Account Menu
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= MIN_WINDOW_SIZE);
    // Function to handle login (replace with your actual login logic)
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNavMenu(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNavMenu(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // Nav Menu Items
    const renderNavMenuItems = buttons.map((buttonText) => {
        const buttonData = buttonDictionary[buttonText];
        if (buttonData) {
            const {text, icon: IconComponent} = buttonData;
            return (
                <MenuItem
                    component={Link}
                    href={'/' + buttonText}
                    key={text}
                    color="primary"
                    aria-label={text}
                    title={text}
                    onClick={handleCloseNavMenu}
                    sx={{
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        '& .MuiSvgIcon-root': {
                            marginRight: 1, // Adjust icon margin if needed
                        }
                    }}
                >
                    <IconComponent/> {/* Always render the icon */}
                    <span className="text">{text}</span>
                </MenuItem>
            );
        } else {
            // Handle case where button text is not found in the dictionary (optional)
            console.error(`Button text "${buttonText}" not found`);
            return null; // To avoid rendering empty elements
        }
    });
    // AppBar Responsive Middle Buttons
    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= MIN_WINDOW_SIZE);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const renderedButtons = buttons.map((buttonText) => {
        const buttonData = buttonDictionary[buttonText];
        if (buttonData) {
            const {text, icon: IconComponent} = buttonData;
            return (
                <Button
                    key={text}
                    color="primary"
                    href={'/' + text}
                    aria-label={text}
                    title={text}
                    sx={{
                        padding: 2,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& .MuiSvgIcon-root': {
                            marginRight: 1, // Adjust icon margin if needed
                        },
                        '& .text': {
                            display: isLargeScreen ? 'block' : 'none', // Use template literal for dynamic check
                        },
                    }}
                >
                    <IconComponent/> {/* Always render the icon */}
                    <span className="text">{text}</span> {/* Render text conditionally based on screen size */}
                </Button>
            );
        } else {
            // Handle case where button text is not found in the dictionary (optional)
            console.error(`Button text "${buttonText}" not found`);
            return null; // To avoid rendering empty elements
        }
    });
    // Nav Menu Items
    const renderProfileMenuItems = profileMenuItems.map((buttonText) => {
        const buttonData = buttonDictionary[buttonText];
        if (buttonData) {
            const {text, icon: IconComponent} = buttonData;
            return (
                <MenuItem
                    key={text}
                    color="primary"
                    component={Link}
                    href={'/' + text}
                    aria-label={text}
                    title={text}
                    onClick={handleCloseUserMenu}
                    sx={{
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        '& .MuiSvgIcon-root': {
                            marginRight: 1, // Adjust icon margin if needed
                        }
                    }}
                >
                    <IconComponent/>
                    <span className="text">{text}</span>
                </MenuItem>
            );
        } else {
            // Handle case where button text is not found in the dictionary (optional)
            console.error(`Button text "${buttonText}" not found`);
            return null; // To avoid rendering empty elements
        }
    });
    // Check for existing login on component mount (optional)
    useEffect(() => {
        // Check local storage or other mechanism for login state
        const storedLogin = localStorage.getItem('isLoggedIn');
        if (storedLogin) {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <AppBar position="static" sx={{borderRadius: '20px'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorElNavMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNavMenu)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: 'block',
                        }}
                    >
                        {renderNavMenuItems}
                    </Menu>
                    <a href="/">
                        <Box component="img" src={logo} alt="Logo" sx={{width: 100, height: 60, mr: 4}}/>
                    </a>
                    {/* Referring to the Homepage / index.html */}
                    {renderedButtons}
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
                            sx={{mt: '45px', padding: 2}}
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
                            {renderProfileMenuItems}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;