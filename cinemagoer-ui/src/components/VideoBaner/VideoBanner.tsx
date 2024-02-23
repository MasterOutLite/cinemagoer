import React from 'react';
import {Box, Skeleton, Stack} from "@mui/material";
import {apiPath} from "@/helper/api";

export interface VideoBannerProps {
    icon: string | null,
    children?: React.ReactNode
}

function VideoBanner({icon, children}: VideoBannerProps) {
    return (
        <Box sx={{
            height: {xs: '100%', sm: '340px'},
            width: {xs: '100%', sm: '250px'},
            maxWidth: '340px', maxHeight: '500px',
        }} p={1}>
            {icon ?
                <img src={apiPath + icon}
                     style={{width: '100%', height: '100%'}}
                     alt={'Icon'}/> :
                children ?
                    <Stack height='100%' justifyContent='center' alignItems='center' sx={{background: 'rgba(0, 0, 0, 0.11)'}}>
                        {children}
                    </Stack>
                    :
                    <Skeleton variant="rectangular" height={'100%'} width={'100%'}/>
            }
        </Box>
    );
}

export default VideoBanner;
