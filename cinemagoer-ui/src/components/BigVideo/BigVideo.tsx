import React from 'react';
import {Video} from "@/type/video";
import {Box, Link, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {getTypeLink} from "@/helper/link";

export interface BigVideoProps extends Video {
}


function BigVideo({id, name, type, ageRating, rate, icon, dateRelease, status, videoCategory,}: BigVideoProps) {
    const typeLink = getTypeLink(videoCategory);
    const data = new Date(dateRelease);
    return (

        <Paper style={{height: '100%'}} sx={{width: {xs: '250px', sm: '180px'}, paddingBottom: '6px'}}>

            < Stack style={{height: '100%'}}>
                <Box sx={{height: {xs: '340px', sm: '250px'}}} mb={1}>
                    {icon ?
                        <img src={'http://localhost:5000/' + icon}
                             style={{width: '100%', height: '100%'}}
                             alt={'Icon'}/>
                        :

                        <Skeleton variant="rectangular" height={'100%'}/>
                    }
                </Box>
                <Link href={`/${typeLink}/${id}`} underline={'none'} color="inherit">
                    <Typography textAlign={'center'} m={'auto'} variant={'h6'} justifyItems={'center'}>
                        {name[0]}
                    </Typography>
                </Link>
                <Typography textAlign={'center'} variant={'subtitle2'} mt={'auto'}>
                    {type.name} | {data.getFullYear().toString()} | {status.name}
                </Typography>
            </Stack>

        </Paper>

    );
}

export default BigVideo;
