"use client"
import React from 'react';
import {Box, Paper, Typography, useTheme} from "@mui/material";


export interface TitleProps {
    children: React.ReactNode,
    style?: React.CSSProperties
}

function Title({children, style}: TitleProps) {
    const them = useTheme();
    // yellow[700]
    return (
        <Paper elevation={3} style={style}>
            <Box p={1}>
                <Typography variant={'h6'}>
                    {children}
                </Typography>
            </Box>
            <Box sx={{background: them.palette.secondary.main || '#000', height: '6px'}}/>
        </Paper>

    );
}

export default Title;
