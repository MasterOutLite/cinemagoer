import React from 'react';
import {Box, Link, Skeleton, Stack, Typography} from "@mui/material";
import Image from "next/image";
import {Series} from "@/type/series";
import {getTypeLink} from "@/helper/link";
import {apiPath} from "@/helper/api";

export interface SmallVideoProps extends Series {
    radius?: number;

}

function SmallVideo({video, radius, series, dateRelease}: SmallVideoProps) {
    const radiusNow = radius || 80;
    const typeLink = getTypeLink(video.videoCategory);
    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'} gap={2}>
            <Box width={radiusNow} height={radiusNow} flexShrink={0}>
                {video.icon ?
                    <img src={apiPath + video.icon} alt={video.icon || 'Image'}
                         width={'100%'} height={'100%'}
                         style={{borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 50%'}}
                    /> :
                    <Skeleton variant="circular" width={'100%'} height={'100%'}/>
                }
            </Box>
            <Typography component={'h4'} style={{alignSelf: 'center', flexGrow: 1}}>
                <Link href={`/${typeLink}/${video.id}`} underline={'none'} color="inherit">
                    {video.name[0]}
                </Link>
            </Typography>

            <Stack justifyContent={'center'} flexShrink={0}>
                <Typography variant={'subtitle2'} component={'span'} textAlign={'center'}>
                    {series} серія
                </Typography>
                <Typography variant={'body2'} component={'span'} color={'#00000099'}>
                    ({new Date(dateRelease).toLocaleDateString()})
                </Typography>
            </Stack>

        </Stack>
    );
}

export default SmallVideo;
