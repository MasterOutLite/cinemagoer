"use client"
import React from 'react';
import {Box, Paper, useTheme} from "@mui/material";

export interface BreakBlockProps {
    style?: React.CSSProperties
}

function BreakBlock({style}: BreakBlockProps) {
    const them = useTheme();
    return (
        <Paper elevation={8} style={style}>
            <Box p={1}>
            </Box>
            <Box sx={{background: them.palette.secondary.main, height: '6px'}}/>
        </Paper>
    );
}

export default BreakBlock;
