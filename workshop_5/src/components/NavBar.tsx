import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Box, Button, Container, Drawer, IconButton, MenuItem, MenuList, Typography} from "@mui/material";
import {useState} from "react";
import {Link} from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

type NavBarProps = {
    active: string
}

const MenuItemStyle = {
    '&.Mui-selected': {
        backgroundColor: 'info.main',
        color: 'white',

        '&:hover': {
            backgroundColor: 'info.main',
        },
    },
    ':hover': {
        backgroundColor: 'rgba(180,222,253,0.82)',
    },
}

function NavBar({ active } : NavBarProps) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                mt: '28px',
            }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                        Самые высокие здания и сооружения
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/">
                            <Button variant={active === '1' ? 'contained' : 'text'} color="info" size="medium">
                                Главная
                            </Button>
                        </Link>
                        <Link to="/list">
                            <Button variant={active === '2' ? 'contained' : 'text'} color="info" size="medium">
                                Список зданий
                            </Button>
                        </Link>
                        <Link to="/chart">
                            <Button variant={active === '3' ? 'contained' : 'text'} color="info" size="medium">
                            Диаграммы
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                        <IconButton aria-label="Menu button">
                            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={ open }
                                onClose={toggleDrawer(false)}
                            >
                                <MenuList>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <IconButton onClick={toggleDrawer(false)}>
                                            <CloseRoundedIcon />
                                        </IconButton>
                                    </Box>
                                    <MenuItem
                                        component={Link}
                                        to="/"
                                        selected={active === '1'}
                                        sx={MenuItemStyle}
                                    >
                                        Главная
                                    </MenuItem>

                                    <MenuItem
                                        component={Link}
                                        to="/list"
                                        selected={active === '2'}
                                        sx={MenuItemStyle}
                                    >
                                        Список зданий
                                    </MenuItem>

                                     <MenuItem
                                        component={Link}
                                        to="/chart"
                                        selected={active === '3'}
                                        sx={MenuItemStyle}
                                    >
                                         Диаграммы
                                     </MenuItem>
                                </MenuList>
                            </Drawer>
                        </IconButton>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;