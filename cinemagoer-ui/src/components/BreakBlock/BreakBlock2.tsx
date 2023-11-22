"use client"
import React from 'react';
import {Box, useTheme} from "@mui/material";

export interface BreakBlockProps {
    style?: React.CSSProperties
}

function BreakBlock2({style}: BreakBlockProps) {
    const them = useTheme();
    return (
        <Box py={1}>
            <Box sx={{background: '#6d1b7b', height: '6px'}}/>
        </Box>
    );
}

export default BreakBlock2;
