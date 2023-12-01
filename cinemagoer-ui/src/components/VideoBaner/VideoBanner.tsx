import React from 'react';
import {Box, Skeleton} from "@mui/material";
import {apiPath} from "@/helper/api";

export interface VideoBannerProps {
    icon: string | null
}

function VideoBanner({icon}: VideoBannerProps) {
    return (
        <Box sx={{
            height: {xs: '100%', sm: '340px'},
            width: {xs: '100%', sm: '250px'},
            maxWidth: '340px', maxHeight: '500px',
        }} p={1}>
            {icon ?
                <img src={apiPath + icon}
                     style={{width: '100%', height: '100%'}}
                     alt={'Icon'}/>
                :
                <Skeleton variant="rectangular" height={'100%'} width={'100%'}/>
            }
        </Box>
    );
}

export default VideoBanner;
