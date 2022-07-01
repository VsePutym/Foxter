import React from 'react';
import {Box, Drawer, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import {Link} from "react-router-dom";
import { createSvgIcon } from '@mui/material/utils';
import AddBoxIcon from '@mui/icons-material/AddBox';

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
);



const Menu = ({closeMenu, openMenu}) => {

    const DrawMenu = [
        {name: 'Главная', id: 0, href: '/home',img:<HomeIcon sx={{p:3}} color="primary" />},
        {name: 'Статистика', id: 1, href: '/statistic', img: <AutoGraphIcon color="primary" sx={{p:3}}/>},
        {name: 'Создание', id: 2, href: '/createCategory', img: <AddBoxIcon color="primary" sx={{p:3}}/>}
        ];

    return (
        <Drawer anchor='bottom' onClose={closeMenu} open={openMenu} sx={{width: '100%', maxWidth: 260}}>
            {DrawMenu.map((item) => (
                <Link key={item.id} to={item.href} onClick={() => closeMenu()}>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.img}
                        </ListItemIcon>
                        <Box>
                            <Typography color={'black'} >{item.name}</Typography>
                        </Box>
                    </ListItemButton>
                    <Divider />
                </Link>
            ))}
        </Drawer>
    );
};

export default Menu;