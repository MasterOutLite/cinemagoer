"use client";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {useRouter} from "next/navigation";
import {Links} from "@/helper/link";
import AvatarUser from "@/layout/UserIcon/AvatarUser";

const nameLogo = 'Cinemagoer';
const drawerWidth = 240;
const navItems = [
    {title: 'Фільми', href: Links.movie},
    {title: 'Серіали', href: Links.serial},
    {title: 'Мультфільми', href: Links.carton},
    {title: 'Аніме', href: Links.anime}];

interface Props {
    window?: () => Window;
}

function Header(props: Props) {
    const router = useRouter();

    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const [selectedIndex, setSelectedIndex] = React.useState<number>();

    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
        router.push(navItems[index].href);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                {nameLogo}
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton style={{textAlign: 'center'}}
                                        selected={selectedIndex === index}
                                        onClick={() => handleListItemClick(index)}
                        >
                            <ListItemText primary={item.title}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex', marginBottom: '12px'}}>
            <CssBaseline/>
            <AppBar component="nav" position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: {xs: 'display', sm: 'block'},
                            textAlign: {xs: 'center', sm: 'start'},
                        }}
                    >
                        <Link href={'/'} color="inherit" underline="none">
                            {nameLogo}
                        </Link>
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item.href}
                                    href={item.href}
                                    color={'inherit'}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </Box>

                    <AvatarUser/>

                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
}

export default Header;
