import React from 'react';
import {VideoType} from "@/type/videoType";
import {Box, Link, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {getTypeLink} from "@/helper/link";
import {apiPath} from "@/helper/api";

export interface BigVideoProps extends VideoType {
}


function PreviewCardVideo({id, name, type, ageRating, rate, icon, dateRelease, status, videoCategory,}: BigVideoProps) {
    const typeLink = getTypeLink(videoCategory);
    const data = new Date(dateRelease);
    return (

        <Paper style={{height: '100%'}} sx={{width: {xs: '250px', sm: '180px'}, paddingBottom: '6px'}}>

            < Stack style={{height: '100%'}}>
                <Box sx={{height: {xs: '340px', sm: '250px'}}} mb={1}>
                    {icon ?
                        <img src={apiPath + icon}
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

export default PreviewCardVideo;
